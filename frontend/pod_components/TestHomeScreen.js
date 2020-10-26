import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

import PodScreen from './PodScreen.js';

export default function HomeScreen() {
    const handlePress = () => console.log("Used function!");
    
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title} numberOfLines={1} onPress={handlePress}>
                HOME SCREEN really really long text blahb lbahbblah hahah
            </Text>
            
            <TouchableOpacity style={styles.block}>
                <Text style={styles.blockText}>
                    Trainee Pod 
                </Text>
                
                <Text>Outcomes Achieved</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.block}>
                <Text style={styles.blockText}>
                    Associate Pod 
                </Text>
                <Text>Outcomes Achieved</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.block}>
                <Text style={styles.blockText}>
                    Partner Pod 
                </Text>
                <Text>Outcomes Achieved</Text>
            </TouchableOpacity>
                                    
            <StatusBar style="auto" />
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

//questions: style and indenting? sizing? style of buttons when pressed?
//<Text>{data}</Text>
//need help on states
//the code for each pod component is so similar. is there a way to make it more modular? 
//how can i do navigation if i don't have homescreen yet
