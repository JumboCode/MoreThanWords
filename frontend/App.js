import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/pod_components/HomeScreen.js';
import TraineePodScreen from './components/pod_components/TraineePod.js';
import AssociatePodScreen from './components/pod_components/AssociatePod.js';
import PartnerPodScreen from './components/pod_components/PartnerPod.js';
import Checkbox from './components/pod_components/checkbox'

const Stack = createStackNavigator();

export default function MainStackNavigator() {          
    return (
        <div>
        <Checkbox />
       <NavigationContainer>
           <Stack.Navigator initialRouteName="Home">
               <Stack.Screen name="Home" component={HomeScreen} />
               <Stack.Screen name="Trainee Pod" component={TraineePodScreen} />
               <Stack.Screen name="Associate Pod" component={AssociatePodScreen} />
               <Stack.Screen name="Partner Pod" component={PartnerPodScreen} />
               <Stack.Screen name="Random Screen" component={RandomScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        </div>
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