import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
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
}}
