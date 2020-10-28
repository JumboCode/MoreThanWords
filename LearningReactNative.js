import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Button, Alert } from 'react-native';
import Constants from 'expo-constants';

// import TestHomeScreen from './pod_components/TestHomeScreen.js';
// import PodScreen from './pod_components/PodScreen.js';

export default function App() {  
    const [data, setData] = React.useState("default");
    fetch(Constants.manifest.extra.apiUrl).then(rawResult => rawResult.json()).then(jsonResult => {
        setData(jsonResult.data)
    });
        
    return (
    <SafeAreaView style={styles.container}>    
        <Text style={{fontSize: 30}}>{data}</Text>
        <Text style={{fontSize: 50}} onPress={() => setData("efa default")}>HELLO WORLDD</Text>
        <Text style={{fontSize: 30}}>{data}</Text>
        
        <Button 
            onPress={() => Alert.alert(
                "MY TITLE", 
                "wassup bro", 
                [
                    {
                        text: "Cancel", 
                        style: "destructive", 
                        onPress: () => console.log("cancel pressed")},
                    { text: "No"},
                    { text: "Yes"}
                ]
            )}
            color="green" 
            title="jumbocode"
        />
        
        <TouchableOpacity onPress={() => Alert.prompt("title", "description", text => console.log(text))}>
            <Image 
                resizeMode="stretch"
                blurRadius={3}
                source={{
                    height: 300,
                    width: 200,
                    uri: "https://picsum.photos/200/300"
                }} 
            />
        </TouchableOpacity>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});