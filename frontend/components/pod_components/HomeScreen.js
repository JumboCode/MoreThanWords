import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

import ProgressBar from '../ProgressBar.js';

const   TRAINEE_TOTAL_OUTCOMES = 7
const ASSOCIATE_TOTAL_OUTCOMES = 11
const   PARTNER_TOTAL_OUTCOMES = 9

const server_add = Constants.manifest.extra.apiUrl;

export default class HomeScreen extends React.Component{
    state = {
        Trainee_progress: 0, 
        Associate_progress: 0,
        Partner_progress: 0
    };

    componentDidMount(){
        axios.get(server_add + 'calculateProgressBar', {
            params: { // Currently using fake data 
                firstname : 'Fake',
                lastname : 'F',
                email: 'fakef@gmail.com'
            }
        })
        .then(response => {
            console.log(response.data);
            let data = response.data;
            this.setState({
                // Currently only have fake data on Trainee
                Trainee_progress: data.records[0].TR_CareerExpl_Outcomes__c + data.records[0].TR_Competency_Outcomes__c + data.records[0].TR_LifeEssentials_Outcomes__c, 
                Associate_progress: 0,
                Partner_progress: 0
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render(){
        return(
        <SafeAreaView style={styles.container}>
        <TouchableOpacity 
            style={styles.block} 
            onPress={() => this.props.navigation.navigate('Trainee Pod')}
        >
            <Text style={styles.blockText}>
                Trainee 
            </Text>
            <ProgressBar progress={this.state.Trainee_progress} total_outcomes={TRAINEE_TOTAL_OUTCOMES} />
        </TouchableOpacity>
      
        <TouchableOpacity 
            style={styles.block} 
            onPress={() => this.props.navigation.navigate('Associate Pod')}
        >
            <Text style={styles.blockText}>
                Associate 
            </Text>
            <ProgressBar progress={this.state.Associate_progress} total_outcomes={ASSOCIATE_TOTAL_OUTCOMES} />
        </TouchableOpacity>
    
        <TouchableOpacity 
            style={styles.block} 
            onPress={() => this.props.navigation.navigate('Partner Pod')}
        >                
            <Text style={styles.blockText}>
                Partner 
            </Text>
            <ProgressBar progress={this.state.Partner_progress} total_outcomes={PARTNER_TOTAL_OUTCOMES} />
        </TouchableOpacity>
    </SafeAreaView>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    block: {
        marginTop: 20,
        width: '100%',
        height: 220,
        backgroundColor: '#ececec',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockText: {
        fontSize: 40,
        fontFamily: 'Roboto',
        color: '#27b48f',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});