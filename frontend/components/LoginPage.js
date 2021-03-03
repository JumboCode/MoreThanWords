/* Adapted from expo/examples/with-auth0 */
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import * as React from "react";
import { Alert, Button, Platform, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import Constants from 'expo-constants';
import { setItemAsync } from 'expo-secure-store';
import LoadingModal from "./LoadingModal";

import * as Random from 'expo-random';

/* converts random bytes into string. Taken from expo-auth-session */
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function convertBufferToString(buffer) {
    const state = [];
    for (let i = 0; i < buffer.byteLength; i += 1) {
        const index = buffer[i] % CHARSET.length;
        state.push(CHARSET[index]);
    }
    return state.join('');
}
// You need to swap out the Auth0 client id and domain with the one from your Auth0 client.
// In your Auth0 client, you need to also add a url to your authorized redirect urls.
//
// For this application, I added https://auth.expo.io/@arielweinberger/with-auth0 because I am
// signed in as the "arielweinberger" account on Expo and the name/slug for this app is "with-auth0".
//
// You can open this app in the Expo client and check your logs to find out your redirect URL.

const auth0ClientId = Constants.manifest.extra.auth0_client_id;
const auth0_domain = Constants.manifest.extra.auth0_domain;
const authorizationEndpoint = auth0_domain + "/authorize";

const useProxy = Platform.select({ web: false, default: true });

export default class LoginPage extends React.Component {
    state = {
        name: null,        // user's name
        loading: false     // decides whether to show the loading modal
    };

    signIn = async () => {
        const random_bytes = Random.getRandomBytes(20);
        const nonce_generated = convertBufferToString(random_bytes);
        // prepares the login request.
        this.setState({loading: true});
        const redirectUri = AuthSession.makeRedirectUri({ useProxy });
        const authenticationOptions = {
            redirectUri: redirectUri,
            responseType: 'code',
            codeChallengeMethod: 'S256',
            clientId: auth0ClientId,
            scopes: ["openid", "profile", "offline_access"],
            audience: Constants.manifest.extra.api_audience,
            extraParams: {
                nonce: nonce_generated,
                prompt: "login",
            },
        };
        const discovery = await AuthSession.fetchDiscoveryAsync(auth0_domain);
        const request = await AuthSession.loadAsync(authenticationOptions, discovery);
        const code_verifier = request.codeVerifier;

        // prompts the user for login
        this.setState({loading: false});
        const code_response = await request.promptAsync(null, { useProxy });
        if (!code_response || !code_response.params || !code_response.params.code ) {
            Alert.alert("Server Error", "Something wrong happened when retrieving your credentials. Please try again soon.");
            return;
        } else if (!code_response.params.state || code_response.params.state != request.state) {
            Alert.alert("Server Error", "Could not verify the authenticity of the login server. Please try again soon.")
        }

        // gets token from the server
        this.setState({loading: true});
        const access_token_req = {
            clientId: auth0ClientId,
            code: code_response.params.code,
            redirectUri: redirectUri,
            scopes: ["openid", "profile", "offline_access"],
            extraParams: {
                "code_verifier": code_verifier
            }
        };
        const token_response = await AuthSession.exchangeCodeAsync(access_token_req, discovery);
        const {accessToken, idToken, refreshToken, issuedAt, expiresIn} = token_response;
        

        // Retrieve the JWT token and decode it
        const decoded = jwtDecode(idToken);
        const { name, nonce } = decoded;
        if (nonce != nonce_generated) {
            Alert.alert("Server Error", "Could not securely login. Please Try again.");
            this.setState({loading: false});
            return;
        } 

        // stores the token in SecureStore (only supported on mobile devices)
        if (useProxy) {
            await setItemAsync("id_token", idToken);
            await setItemAsync("access_token", accessToken);
            await setItemAsync("expire_time", (issuedAt + expiresIn).toString());
            await setItemAsync("refresh_token", refreshToken);
        };

        this.setState({name, loading: false});
        this.props.refresh();
    }

    render() {
        return (
            <View style={styles.container}>
                <LoadingModal loading={this.state.loading}/>
                {this.state.name ? (
                    <Text style={styles.title}>You are logged in, {this.state.name}!</Text>
                ) : (

                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.logo}
                            source={require("./logo.png")}
                        />
                        <TouchableOpacity
                            onPress={this.signIn}
                            style={styles.buttonContainer}
                        >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        marginTop: -250,
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        marginTop: 40,
    },
    buttonContainer: {
        width: 296,
        height: 56,
        backgroundColor: "#ff4646",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        borderRadius: 10,
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowColor: 'red',
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
    logo: {
        justifyContent: "center",
        alignItems: "center",
        height: 250,
        resizeMode: "contain",
    }
});
