import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
// import Task from './components/outcomes/Task'
import Outcome from './components/outcomes/Outcome';

export default function App() {
    const [data, setData] = React.useState("default");
    fetch(Constants.manifest.extra.apiUrl).then(rawResult => rawResult.json()).then(jsonResult => {
        setData(jsonResult.data)
    });
    return (
        <View style={styles.container}>
            {/* <Text>Open up App.js to start working on your app!</Text> */}
            {/* <Text>{data}</Text> */}
            {/* <Task name="Hello" starIsFilled={true}></Task>
            <Task name="Goodbye"></Task>
            <Task name="Three"></Task>
            <StatusBar style="auto" /> */}
            <Outcome title="Example"/>
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
});

