import React, { useState, } from 'react'
import { StyleSheet, 
        Text, 
        View, 
        Image, 
        TextInput, 
        Button } from 'react-native';

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

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('./TransparentMTWLogo.png')}
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
                    onPress={() => handleLogin()}
                    title="LOGIN"
                    color="#FFFFFF"
                    accessibilityLabel="Login"
                />
            </View>
            <Text style={styles.forgot}>
                <Text >Forgot Password?</Text>
                <Text 
                    style={{ color: '#FF3D3D', fontWeight: 'bold' }} 
                    onPress={() => handleRecoverPass()}> Recover here</Text>
            </Text>
            <Text style={styles.noAccount}>
                <Text>Don't have an account? </Text>
                <Text
                    style={{ color: '#FF3D3D', fontWeight: 'bold' }} 
                    onPress={() => handleNewUser()}>Signup here</Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
    },
    image: {
        marginBottom: '-2%',
        marginTop: "-20%",
        position: 'relative',
    },
    inputContainer: {
        flex: 0.6,
        position: 'relative',
        width: '70%'
        
    },
    emailField: {
        position: 'absolute',
        marginTop: '0%',
        backgroundColor: '#e0dcdc',
        paddingLeft: '15%',
        paddingRight: '40%',
        borderRadius: 2, 
        marginLeft: '-50%',
        height: '25%',
        width: '116%',

        alignItems: 'center'
    },
    inputField: {
        position: 'absolute',
        marginTop: '22%',
        backgroundColor: '#e0dcdc',
        paddingLeft: '15%',
        paddingRight: '40%',
        borderRadius: 2, 
        marginLeft: '-50%',
        height: '15%',
        width: '116%',
        alignItems: 'center'
    },
    button: {
        marginVertical: 3,
        paddingLeft: '25%',
        paddingRight: '25%',
        paddingTop: '1.5%',
        paddingBottom: '1.5%',
        backgroundColor: '#FF3D3D',
        marginTop: '-8%',
        borderRadius: 5,
    },
    forgot: {
        marginTop: '3%',
        fontSize: 10,
    },
    noAccount: {
        marginTop: '10%',
        fontSize: 12,
    }
})