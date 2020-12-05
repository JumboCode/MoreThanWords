import jwtDecode from "jwt-decode";
import Constants from 'expo-constants';
import { getItemAsync, deleteItemAsync } from 'expo-secure-store';
import { revokeAsync } from 'expo-auth-session';

const ID_KEY = "id_token";
const ACCESS_TOKEN_KEY = "access_token";
const EXPIRE_TIME_KEY = "expire_time";
const REFRESH_TOKEN_KEY = "refresh_token";

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

/* removed token, effectively logging out */
export async function removeToken() {
    // TODO revoke
    await deleteItemAsync(ID_KEY);
    await deleteItemAsync(EXPIRE_TIME_KEY);
    await deleteItemAsync(ACCESS_TOKEN_KEY);
    await deleteItemAsync(REFRESH_TOKEN_KEY);
}
