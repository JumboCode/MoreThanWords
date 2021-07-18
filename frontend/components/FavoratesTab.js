import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import StarredTasksPage from './pod_components/StarredTasksPage';

const Stack = createStackNavigator();


export default function FavoratesTab() {
   return <Stack.Navigator>
   <Stack.Screen
       name="Starred Tasks"
       component={StarredTasksPage}
   />
 </Stack.Navigator>;
}
