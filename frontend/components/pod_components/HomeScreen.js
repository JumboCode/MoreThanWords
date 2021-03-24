import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js';

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
        getAccessToken().then(accessToken => 
            fetch(server_add + '/calculateProgressBar', {
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            })
        )
        .then(async response => {
            let data = await response.json();
            this.setState({
                Trainee_progress: data.records[0].TR_Competency_Completed__c + data.records[0].TR_CareerExpl_Completed__c + data.records[0].TR_LifeEssentials_Completed__c,
                Associate_progress: 0,
                Partner_progress: 0
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        console.log(this.props);
        return (
        <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.container}>
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => this.props.navigation.navigate('Trainee Pod', {
                    pod: 'Trainee'
                })}
            >
                <Text style={styles.blockText}>
                    Trainee 
                </Text>
                <ProgressBar progress={this.state.Trainee_progress} total_outcomes={TRAINEE_TOTAL_OUTCOMES} />
            </TouchableOpacity>
      
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => this.props.navigation.navigate('Associate Pod', {
                    pod: 'Associate'
                })}
            >
                <Text style={styles.blockText}>
                    Associate 
                </Text>
                <ProgressBar progress={this.state.Associate_progress} total_outcomes={ASSOCIATE_TOTAL_OUTCOMES} />
            </TouchableOpacity>
    
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => this.props.navigation.navigate('Partner Pod', {
                    pod: 'Partner'
                })}
            >                
                <Text style={styles.blockText}>
                    Partner 
                </Text>
                <ProgressBar progress={this.state.Partner_progress} total_outcomes={PARTNER_TOTAL_OUTCOMES} />
            </TouchableOpacity>
            </SafeAreaView>
        </ScrollView>
        )
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
        // fontFamily: 'Roboto',
        color: '#27b48f',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    scrollView: {
        backgroundColor: 'white'
    }
});