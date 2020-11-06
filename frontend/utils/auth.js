import jwtDecode from "jwt-decode";
import Constants from 'expo-constants';
import { setItemAsync, getItemAsync } from 'expo-secure-store';
import { exp } from "react-native-reanimated";

const ACCESS_KEY = "access_token";

/* returns raw jwt. */
export async function getjwt() {
    return await getItemAsync(ACCESS_KEY);
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
