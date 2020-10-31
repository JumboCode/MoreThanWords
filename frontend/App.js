import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './pod_components/HomeScreen.js';
import TraineePodScreen from './pod_components/TraineePod.js';
import AssociatePodScreen from './pod_components/AssociatePod.js';
import PartnerPodScreen from './pod_components/PartnerPod.js';
import SignUp from './components/SignUp'

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    const [loggedIn, setLoggedIn] = React.useState(false);

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                {loggedIn ?(
                    <>
                        <Stack.Screen name="Home">
                            {props => <HomeScreen {...props} loggedIn={loggedIn} />}
                        </Stack.Screen>
                        <Stack.Screen name="Trainee Pod" component={TraineePodScreen} />
                        <Stack.Screen name="Associate Pod" component={AssociatePodScreen} />
                        <Stack.Screen name="Partner Pod" component={PartnerPodScreen} />
                        <Stack.Screen name="Random Screen" component={RandomScreen} />
                    </>
                ): (
                    <>
                        <Stack.Screen name="Sign Up" component={SignUp} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
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