/* Adapted from expo/examples/with-auth0 */
import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import * as React from "react";
import { Alert, Button, Platform, StyleSheet, Text, View } from "react-native";
import Constants from 'expo-constants';
import { setItemAsync } from 'expo-secure-store';
import { Buffer } from 'buffer';
import * as Crypto from 'expo-crypto';
import * as Random from 'expo-random';

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
    };
    
    async componentDidUpdate() {
        if (this.state.result) {
            if (this.state.result.error) {
                Alert.alert(
                    "Authentication error",
                    result.params.error_description || "something went wrong"
                );
                return;
            }
            if (this.state.result.type === "success") {
                console.log(result);
                // Retrieve the JWT token and decode it
                const id_token = this.state.result.params.id_token;
                const access_token = this.state.result.params.id_token;
                const decoded = jwtDecode(id_token);

                const { name } = decoded;
                this.setState({ name });

                // stores the token in SecureStore
                setItemAsync("access_token", id_token).then(() => {
                    refresh();
                    console.log(this.state.result.params);
                });
            }
        }
    }
    
    signIn = async () => {
        const redirectUri = AuthSession.makeRedirectUri({ useProxy });
        const authenticationOptions = {
            redirectUri: redirectUri,
            responseType: 'code',
            //codeChallenge: code_challenge,
            codeChallengeMethod: 'S256',
            clientId: auth0ClientId,
            scopes: ["openid", "profile", "offline_access"],
            audience: Constants.manifest.extra.api_audience,
            extraParams: {
                // ideally, this will be a random value
                nonce: "nonce",
                prompt: "login",
            },
        };
        const discovery = await AuthSession.fetchDiscoveryAsync(auth0_domain);
        const request = await AuthSession.loadAsync(authenticationOptions, discovery);
        const code_verifier = request.codeVerifier;

        const code_response = await request.promptAsync(null, { useProxy });
        if (!code_response || !code_response.params || !code_response.params.code ) {
            Alert.alert("Server Error", "Something wrong happened when retrieving your credentials. Please try again soon.");
            return;
        } else if (!code_response.params.state || code_response.params.state != request.state) {
            Alert.alert("Server Error", "Could not verify the authenticity of the login server. Please try again soon.")
        }

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
        console.log(token_response);


    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.name ? (
                    <Text style={styles.title}>You are logged in, {this.state.name}!</Text>
                ) : (
                    <Button
                        title="Log in with Auth0"
                        onPress={this.signIn}
                    />
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
    title: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 40,
    },
});
