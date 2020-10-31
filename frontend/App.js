import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LotsOfPods         from './components/HomeScreen.js';
import TraineePodScreen   from './components/pod_components/TraineePod.js';
import AssociatePodScreen from './components/pod_components/AssociatePod.js';
import PartnerPodScreen   from './components/pod_components/PartnerPod.js';

const Stack = createStackNavigator();

export default function App() {
    const [data, setData] = React.useState("default");
    fetch(Constants.manifest.extra.apiUrl).then(rawResult => rawResult.json()).then(jsonResult => {
        setData(jsonResult.data)
    });
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home Screen" component={LotsOfPods} />
                <Stack.Screen name="Trainee Pod" component={TraineePodScreen} />
                <Stack.Screen name="Associate Pod" component={AssociatePodScreen} />
                <Stack.Screen name="Partner Pod" component={PartnerPodScreen} />
            </Stack.Navigator>
        </NavigationContainer>
        // <View style={styles.container}>
        //     {/* <Text>Open up App.js to start working on your app!</Text> */}
        //     {/* <Text>{data}</Text> */}
        //     <StatusBar style="auto" />
        // {/* Home pods */}
        //     <LotsOfPods />
        // </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

