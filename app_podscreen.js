import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Button, Alert } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import TestHomeScreen from './pod_components/TestHomeScreen.js';
import PodScreen from './pod_components/PodScreen.js';

export default function App() {  
    const [data, setData] = React.useState("default");
    fetch(Constants.manifest.extra.apiUrl).then(rawResult => rawResult.json()).then(jsonResult => {
        setData(jsonResult.data) 
    });
        
    return (
           <PodScreen />
    );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
        }
});

//questions: style and indenting? sizing? style of buttons when pressed?
//<Text>{data}</Text>
//need help on states
//the code for each pod component is so similar. is there a way to make it more modular? 
//how can i do navigation if i don't have homescreen yet
