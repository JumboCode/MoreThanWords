import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

import PodProgressBar from './PodProgressBar.js';

export default function TraineePodScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => navigation.navigate('Random Screen')}
            >
                <Text style={styles.blockTitle}>
                    Competencies
                </Text>   
                <PodProgressBar />
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => navigation.navigate('Random Screen')}
            >
                <Text style={styles.blockTitle}>
                    Career Pathway
                </Text>
                <PodProgressBar />
            </TouchableOpacity>
        
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => navigation.navigate('Random Screen')}
            >                
                <Text style={styles.blockTitle}>
                    Life Essentials / Support Network
                </Text>
                <PodProgressBar />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    block: {
        width: '100%',
        height: 180,
        backgroundColor: '#fcfcfc',
        marginTop: 40,
    },
    blockTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 30,
        marginRight: 50,
    },
});