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

/********** BEGIN PKCE Challenge Infrusture **********/
// ref: https://chrisfrewin.medium.com/auth0-expo-and-react-native-authorization-code-grant-flow-with-pkce-d612d098f5f3
// function to encode the encrypted thing
function generateShortUUID() {
    return Math.random()
        .toString(36)
        .substring(2, 15);
}

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

async function sha256(buffer) {
    return await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        buffer,
        { encoding: Crypto.CryptoEncoding.BASE64 }
    );
}


/********** END PKCE Challenge Infrusture **********/

export default class LoginPage extends React.Component {
    state = {
        name: null,
        request: null,
        result: null
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
                });
            }
        }
    }

    async componentDidMount() {
        const state = generateShortUUID();
        const randomBytes = await Random.getRandomBytesAsync(32);
        const base64String = Buffer.from(randomBytes).toString('base64');
        const code_verifier = base64URLEncode(base64String);
        const code_challenge = base64URLEncode(await sha256(code_verifier));
        const redirectUri = AuthSession.makeRedirectUri({ useProxy });
        console.log(redirectUri);
        const authenticationOptions = {
            redirectUri: redirectUri,
            responseType: 'code',
            codeChallenge: code_challenge,
            codeChallengeMethod: 'S256',
            clientId: auth0ClientId,
            scopes: ["openid", "profile"],
            audience: Constants.manifest.extra.api_audience,
            state,
            extraParams: {
                // ideally, this will be a random value
                nonce: "nonce",
                prompt: "login",
            },
        };
        const discovery = await AuthSession.fetchDiscoveryAsync(auth0_domain);
        const request = await AuthSession.loadAsync(authenticationOptions, discovery);
        this.setState({
            request: request,
        });
        console.log("done!!!!!!!!!");
    }

    signIn = async () => {
        console.log(useProxy);
        this.state.request.promptAsync(null, { useProxy });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.name ? (
                    <Text style={styles.title}>You are logged in, {this.state.name}!</Text>
                ) : (
                    <Button
                        disabled={!this.state.request}
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
