import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function Screen() {
   return <ScrollView>
      <Text>Under Work</Text>
   </ScrollView>
}


export default function FavoratesTab() {
   return <Stack.Navigator>
   <Stack.Screen
       name="Starred"
       component={Screen}
   />
 </Stack.Navigator>;
}
