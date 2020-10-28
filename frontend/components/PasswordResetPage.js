import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, Image, processColor } from 'react-native';
import Constants from 'expo-constants';

class PasswordResetPage extends React.Component {
    state = {
        "email": ""
    }

    /*
     * async member function send_email
     *
     * sends a request to the flask server for a email verification error to be sent.
     * Alerts the user whether the request is successful or not.
     */
    send_email = async () => {

        try {
            // CHECK IF EMAIL EXISTS in the SalesForce. Is it needed?
            // prepare and the request
            let request_body = {
                "email": this.state.email
            }

            let response = await fetch(`${Constants.manifest.extra.apiUrl}reset`, {
                method: 'POST',
                body: JSON.stringify(request_body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            let response_body = await response.json();

            // gives alert based on response
            if (response.status != 200 || !('status' in response_body) || response_body.status !== 'good') {
                Alert.alert("Sorry! your request failed.", response_body['data']);
                return;
            }

        } catch (e) {
            Alert.alert("Sorry! your request failed.", "Network connection failed.");
        }

        try {
            // SEND an email request to the Auth0 API.
            // API Doc: https://auth0.com/docs/api/authentication
            let request_body = {
                "email": this.state.email,
                "client_id": Constants.manifest.extra.auth0_client_id,
                "connection": Constants.manifest.extra.auth0_dbconnection
            };

            let response = await fetch(Constants.manifest.extra.auth0_domain + "/dbconnections/change_password", {
                method: 'POST',
                body: JSON.stringify(request_body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                Alert.alert("Error requesting an email to be sent. Please try again soon.")
            } else {
                Alert.alert("Success!", "Please check your email for a reset link."); 
            }
        } catch (e) {
            Alert.alert("Error requesting an email to be sent. Please try again soon.")
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('../static/Transparent_MTW_Logo.png')}/>
                <Text style={{fontSize: 20, textAlign: 'left'}}>Please Enter your Email below:</Text>
                <TextInput
                    onChangeText={text => {
                        this.setState({"email": text});
                    }}
                    style={{ height: 40, alignSelf: 'stretch', borderWidth: 1 }}
                />
                <Button
                    title="Submit"
                    onPress={this.send_email}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50
  }, logo: {
      width: 300,
      height: 150
  }
});

export default PasswordResetPage;
