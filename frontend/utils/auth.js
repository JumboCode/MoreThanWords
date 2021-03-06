import jwtDecode from "jwt-decode";
import Constants from 'expo-constants';
import { getItemAsync, deleteItemAsync, setItemAsync } from 'expo-secure-store';
import { revokeAsync, refreshAsync, fetchDiscoveryAsync } from 'expo-auth-session';

const ID_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";
const EXPIRE_TIME_KEY = "expire_time";
const REFRESH_TOKEN_KEY = "refresh_token";
const auth0ClientId = Constants.manifest.extra.auth0_client_id;
const auth0_domain = Constants.manifest.extra.auth0_domain;

/* returns raw jwt. */
export async function getjwt() {
    return await getItemAsync(ID_KEY);
}

/* returns the name field of the jwt. */
export async function getName() {
    const jwt_token = await getjwt();
    if (jwt_token === null) {
        return null;
    } else {
        const jwt = jwtDecode(jwt_token);
        return jwt.name;
    }
}

/* returns if the token has expired or not */
export async function isTokenValid() {
    const jwt_token = await getjwt();
    if (jwt_token === null) {
        // user is not logged in, just return false.
        return false;
    } else {
        // process the jwt
        const jwt = jwtDecode(jwt_token);
        const expire_time = jwt.exp;

        if (expire_time === null) {
            // if there's no expire time, it's always valid?
            return true;
        }

        const currtime = Date.now().valueOf() / 1000;
        return currtime < expire_time;
    }
}

/* renews the id and access token using the refresh token, 
 * and returns the new access token */
export async function renewAccessToken() {
    const discovery = await fetchDiscoveryAsync(auth0_domain);
    const refresh_req = {
        refreshToken: await getItemAsync(REFRESH_TOKEN_KEY),
        clientId: auth0ClientId,
        scopes: ["openid", "profile"]
    };
    const refresh_res = await refreshAsync(refresh_req, discovery);
    await setItemAsync(ACCESS_TOKEN_KEY, refresh_res.accessToken);
    await setItemAsync(EXPIRE_TIME_KEY, (refresh_res.issuedAt + refresh_res.expiresIn).toString());
    await setItemAsync(ID_KEY, refresh_res.idToken);
    return refresh_res.accessToken;
}

export async function getAccessToken() {
    const expire_timestamp = 1000 * parseInt(await getItemAsync(EXPIRE_TIME_KEY));
    const date_now = Date.now();
    if (date_now > expire_timestamp * 1000) await renewAccessToken();
    return await getItemAsync(ACCESS_TOKEN_KEY);
}

/* removed token, effectively logging out */
export async function removeToken() {
    const refresh_token = await getItemAsync(REFRESH_TOKEN_KEY);
    const discovery = await fetchDiscoveryAsync(auth0_domain);
    await deleteItemAsync(ID_KEY);
    await deleteItemAsync(EXPIRE_TIME_KEY);
    await deleteItemAsync(ACCESS_TOKEN_KEY);
    await deleteItemAsync(REFRESH_TOKEN_KEY);

    // revoke the token
    await revokeAsync({
            token: refresh_token,
            clientId: auth0ClientId,
        }, discovery);
    
}
