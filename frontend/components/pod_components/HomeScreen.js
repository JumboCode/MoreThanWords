import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Checkbox from './checkbox'

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} >
                HOME SCREEN
            </Text>
            
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => navigation.navigate('Trainee Pod')}
            >
                <Text style={styles.blockText}>
                    Trainee Pod 
                </Text>
                
                <Text>Outcomes Achieved</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => navigation.navigate('Associate Pod')}
            >
                <Text style={styles.blockText}>
                    Associate Pod 
                </Text>
                <Text>Outcomes Achieved</Text>
            </TouchableOpacity>
        
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => navigation.navigate('Partner Pod')}
            >                
                <Text style={styles.blockText}>
                    Partner Pod 
                </Text>
                <Text>Outcomes Achieved</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
    },
    block: {
        marginTop: 40,
        width: 300,
        height: 180,
        backgroundColor: 'dodgerblue',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockText: {
        fontSize: 25,
        textAlign: 'center',
    },
});
