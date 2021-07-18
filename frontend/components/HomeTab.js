import OutcomesScreen from './outcomes/OutcomesScreen.js';
import HomeScreen from './pod_components/HomeScreen.js';
import PodScreen from './pod_components/PodScreen.js';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Image } from 'react-native';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Stack = createStackNavigator();

const header_back_img = () => (
  <Image source={require("./arrow_back.png")} style={{ width: 20, height: 20, marginLeft: 16}} />
);

export default function HomeTab() {
  return <Stack.Navigator initialRouteName="Pods">
              <Stack.Screen
                  name="Pods"
                  component={HomeScreen}
                  options={{
                      headerTitleAlign: 'center',
                      animationEnabled: false
                  }}
              />
              <Stack.Screen 
                  name="Trainee Pod" 
                  component={PodScreen} 
                  options={{
                      headerTitleAlign: 'center',
                      headerBackImage: header_back_img,
                      headerBackTitleVisible: false
                  }} />
              <Stack.Screen 
                  name="Associate Pod" 
                  component={PodScreen} 
                  options={{
                      headerTitleAlign: 'center',
                      headerBackImage: header_back_img,
                      headerBackTitleVisible: false
                  }}/>
              <Stack.Screen 
                  name="Partner Pod" 
                  component={PodScreen} 
                  options={{
                      headerTitleAlign: 'center',
                      headerBackImage: header_back_img,
                      headerBackTitleVisible: false
                  }}/>
              <Stack.Screen 
                  name="Outcomes" 
                  component={OutcomesScreen} 
                  options={{
                      headerTitleAlign: 'center',
                      headerBackImage: header_back_img,
                      headerBackTitleVisible: false
              }}/>
            </Stack.Navigator>
}
