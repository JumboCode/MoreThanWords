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

    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('./TransparentMTWLogo.png')}
            />
            <View style={styles.inputContainer}>
                <TextInput 
                    onChangeText={(value) => handleEmailInput(value)}
                    style={styles.inputField}
                    placeholder={'Email'}    
                />
                <TextInput 
                    // secureTextEntry
                    style={styles.inputField}    
                    onChangeText={(value) => handlePassInput(value)}
                    placeholder={'Password'}
                />
            </View>
            <View style={styles.button}>
                <Button 
                    title="LOGIN"
                    color="#FFFFFF"
                    accessibilityLabel="Login"
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        marginHorizontal: 16
    },
    image: {
        marginBottom: '20%',
        marginTop: "-50%",
    },
    inputContainer: {
        position: 'relative',
        width: '68%',
        marginLeft: '16%',
        marginRight: '16%'
    },
    inputField: {
        height: '80%',
        marginTop: '3%',
        backgroundColor: '#e0dcdc',
        paddingLeft: '10%',
        paddingRight: '40%',
        borderRadius: 2, 
        alignItems: 'center',
    },
    button: {
        marginVertical: 3,
        paddingLeft: '25%',
        paddingRight: '25%',
        paddingTop: '1.5%',
        paddingBottom: '1.5%',
        backgroundColor: '#FF3D3D',
        marginTop: '25%',
        borderRadius: 5,
    }
})