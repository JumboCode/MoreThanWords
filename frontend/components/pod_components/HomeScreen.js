import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { getAccessToken } from '../../utils/auth.js';

import HomeScreenPod from './HomeScreenPod.js'
import ProgressBar from '../ProgressBar.js';

const server_add = Constants.manifest.extra.apiUrl;
const pods = ['Trainee', 'Associate', 'Partner']; // hardcoded pod names for data query and subsequent screens

export default class HomeScreen extends React.Component{
    render(){
        return(
            pods.map((pod,index) => 
                <HomeScreenPod 
                    key={index} // guarantee a unique id for each item
                    pod={pod} 
                    route={this.props.route}
                    navigation={this.props.navigation} 
                />)
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    block: {
        marginTop: 20,
        width: '100%',
        height: 220,
        backgroundColor: '#27b48f',
        borderColor: 'white',
        borderWidth: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockText: {
        fontSize: 40,
        // fontFamily: 'Roboto',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollView: {
        backgroundColor: 'white'
    }
});
