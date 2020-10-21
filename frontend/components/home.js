import React, { Component } from 'react';
import { StyleSheet, Linking, Text, View, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef } from 'react';

// class Home extends Component {
//     render() {
//         return (
//             <View>
//                 <Text>
//                     hello world
//                 </Text>
//             </View>
//         )
//     }
// }

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

const ProgressBar = (props) => {
  return (
    <View  >
      
    </View>
  );
}
const Pod = (props) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => Linking.openURL(props.url)}>
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

const LotsOfPods = () => {
    return (
      <View>
        <Text>PROMPT: Home Page</Text>
        <Pod name ='Trainee'  complete = '5' total = '11' url = 'http://google.com'/>
        <Pod name='Associate' complete = '3' total = '6'  url = 'http://google.com'/>
        <Pod name='Partner'   complete = '0' total = '9'  url = 'http://google.com'/>
      </View>
    );
  }
  
  
export default LotsOfPods;