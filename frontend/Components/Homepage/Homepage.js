import React, { useState, } from 'react'
import { Platform,
        StyleSheet, 
        Text, 
        View, 
        Image, 
        TextInput,
        Button } from 'react-native'
import { iosStyles, androidStyles } from './styling'

export default function Homepage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function handleEmailInput(e) {
        setEmail(e)
    }

    function handlePassInput(e) {
        setPassword(e)
    }

    function handleLogin() {
        console.log('logging in')
        //Password Auth 
    }

    function handleRecoverPass() {
        console.log("recover password")
        //Navigate to recover pass component 
    }

    function handleNewUser() {
        console.log("create new user")
        //Navigate to new user page
    }

    const styles = Platform.OS === 'ios' ? iosStyles : androidStyles

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={
                    { uri: "https://raw.githubusercontent.com/JumboCode/MoreThanWords/staging/images/Transparent%20MTW%20Logo.png" }} 
                    style={{ width: 305, height: 159 }}
            />
            <View style={styles.inputContainer}>
                <TextInput 
                    onChangeText={(value) => handleEmailInput(value)}
                    style={styles.emailField}
                    placeholder={'Email'}    
                />
                <TextInput 
                    secureTextEntry
                    style={styles.inputField}    
                    onChangeText={(value) => handlePassInput(value)}
                    placeholder={'Password'}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    style={styles.buttonBackgrou}
                    onPress={() => handleLogin()}
                    title="LOGIN"
                    color={`${Platform.OS == 'ios' ? 'white' : '#FF3D3D'}`}
                    accessibilityLabel="Login"
                />
            </View>
            <Text style={styles.forgot}>
                <Text >Forgot Password?</Text>
                <Text 
                    style={{ color: '#FF3D3D' }} 
                    onPress={() => handleRecoverPass()}> Recover here</Text>
            </Text>
            <Text style={styles.noAccount}>
                <Text>Don't have an account? </Text>
                <Text
                    style={{ color: '#FF3D3D' }} 
                    onPress={() => handleNewUser()}>Signup here</Text>
            </Text>
        </View>
    )
}