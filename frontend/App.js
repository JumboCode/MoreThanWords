import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Homepage from './Components/Homepage/Homepage'

import HomeScreen from './pod_components/HomeScreen.js';
import TraineePodScreen from './pod_components/TraineePod.js';
import AssociatePodScreen from './pod_components/AssociatePod.js';
import PartnerPodScreen from './pod_components/PartnerPod.js';

const Stack = createStackNavigator();

export default function MainStackNavigator() {          
    return (
        <View style={styles.container}>
            {/* <Text>Open up App.js to start working on your app!</Text>
            <Text>{data}</Text> */}
            <Homepage />
            <StatusBar style="auto" />
        </View>
    );
}

function RandomScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
          When the competencies screen, career pathway screen, and life 
          essential screens get set up, replace this screen with them.
      </Text>
    </View>
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
});