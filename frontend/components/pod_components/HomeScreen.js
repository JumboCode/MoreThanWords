import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

import ProgressBar from '../ProgressBar.js';

export default function HomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => navigation.navigate('Trainee Pod')}
            >
                <Text style={styles.blockText}>
                    Trainee 
                </Text>
                <ProgressBar />
            </TouchableOpacity>
          
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => navigation.navigate('Associate Pod')}
            >
                <Text style={styles.blockText}>
                    Associate 
                </Text>
                <ProgressBar />
            </TouchableOpacity>
        
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => navigation.navigate('Partner Pod')}
            >                
                <Text style={styles.blockText}>
                    Partner 
                </Text>
                <ProgressBar />
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
    block: {
        marginTop: 20,
        width: '100%',
        height: 220,
        backgroundColor: '#ececec',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockText: {
        fontSize: 40,
        fontFamily: 'Roboto',
        color: '#27b48f',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});