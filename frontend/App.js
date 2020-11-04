import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View, Container, Header, Left, Body, Right, Title} from 'native-base';
import Constants from 'expo-constants';
// import Task from './components/outcomes/Task'
import Outcome from './components/outcomes/Outcome';

import HomeScreen from './components/pod_components/HomeScreen.js';
import TraineePodScreen from './components/pod_components/TraineePod.js';
import AssociatePodScreen from './components/pod_components/AssociatePod.js';
import PartnerPodScreen from './components/pod_components/PartnerPod.js';

// const Stack = createStackNavigator();

export default function MainStackNavigator() {          
    return (
        <View style={styles.container}>
            {/* <Text>Open up App.js to start working on your app!</Text> */}
            {/* <Text>{data}</Text> */}
            {/* <Task name="Hello" starIsFilled={true}></Task>
            <Task name="Goodbye"></Task>
            <Task name="Three"></Task>
            <StatusBar style="auto" /> */}
            <Container>
                <Header>
                    <Left />
                    <Body>
                        <Title>Career Pathway</Title>
                    </Body>
                    <Right />
                </Header>
            </Container>
            <Outcome title="Example"/>
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
        // alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
    },
});