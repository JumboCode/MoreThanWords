import React, { Component } from 'react';
import { StyleSheet, Linking, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from 'react';

import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withNavigation } from 'react-navigation';

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#fff8dc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#303838',
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
  progressBar: {
    margin: 5,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  },
  progressBar_progress: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    color: 'blue',
    width: 50
  }
});

const Pod = (props, { navigation }) => {
    
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Trainee Pod')/*Linking.openURL(props.url)*/}>
          <Text style={styles.baseText}>{props.name}</Text>

          <View style={styles.progressBar}>
              <View style = {styles.progressBar_progress} />
            <Text>progress: {props.complete} / {props.total} </Text>
          </View>

          <Text>{props.complete} of {props.total} outcome Achieved</Text>
        </TouchableOpacity>
        
        
      </View>
    );
  }

const LotsOfPods = (props) => {
    return (
      <View>
        <Text>PROMPT: Home Page</Text>
        <Pod name='Trainee'   complete='5' total='11' navigation='props.navigation'/>
        <Pod name='Associate' complete='3' total='6' />
        <Pod name='Partner'   complete='0' total='9' />
      </View>
    );
  }
  
  
export default withNavigation(LotsOfPods);