import React, { useState, } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';

export default function Homepage() {
    const [email, setEmail] = useState('')
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('./TransparentMTWLogo.png')}
            />
                <TextInput 
                    style={styles.inputField}
                    placeholder={'Email'}    
                />
                <TextInput 
                    style={styles.inputField}    
                    placeholder={'Password'}
                />
            <Button 
                title="Login"
                color="red"
                accessibilityLabel="Login"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginBottom: '0%',
        marginTop: "-50%"
    },
    inputField: {
        position: 'relative',
        height: '15%',
        marginTop: '3%',
        backgroundColor: '#e0dcdc',
        paddingLeft: '10%',
        paddingRight: '40%',
        borderRadius: 2,
        alignItems: 'center',
    },
    login: {
        color: 'red',
    }
})