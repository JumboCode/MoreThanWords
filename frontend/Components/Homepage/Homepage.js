import React from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

export default function Homepage() {
    return (
        <View style={styles.container}>
            <Image 
                style={styles.image}
                source={require('./TransparentMTWLogo.png')}
            />
            <TextInput 
                style={styles.inputField}
                value={'Hello'}    
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
        marginBottom: 5
    },
    inputField: {
        height: '10%',
        width: '20%',
        borderRadius: 2,
        borderColor: '#f0ffff',
        alignItems: 'center',
    }
})