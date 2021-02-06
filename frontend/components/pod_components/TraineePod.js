import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

import PodProgressBar from './PodProgressBar.js';

const COMPET_TOTAL_OUTCOMES = 3
const CAREER_TOTAL_OUTCOMES = 2
const LIFE_TOTAL_OUTCOMES = 2

const server_add = Constants.manifest.extra.apiUrl;

export default class TraineePodScreen extends React.Component {
    /* State variables initalized:
     * 	  - compet_outcomes: number of completed competency outcomes 
     * 	  - career_outcomes: number of completed career pathway outcomes
     * 	  - life_outcomes: number of completed life essential outcomes 
     */
    state = {
        compet_outcomes: 0, 
        career_outcomes: 0,
        life_outcomes: 0,
    };

    /* componentDidMount
	 * Parameters: none
	 * Returns: nothing
	 * Purpose: Get the data from backend and use the info to set states
     * Note: using fake data for now
	 */
    componentDidMount() {
        axios.get(server_add + '/calculateProgressBar', {
              params: {
                  firstname: 'Fake',
                  lastname: 'E',
                  email: 'fakee@gmail.com',
              }
          })
          .then(response => {
              console.log(response.data);
              let data = response.data;
              this.setState({
                  compet_outcomes: data.records[0].TR_Competency_Outcomes__c,
                  career_outcomes: data.records[0].TR_CareerExpl_Outcomes__c,
                  life_outcomes: data.records[0].TR_LifeEssentials_Outcomes__c,
              })
          })
          .catch(function (error) {
              console.log(error);
          });
    }
    
    /* render
	 * Paramaters: none
	 * Returns: nothing
	 * Purpose: renders page, which takes backend data from salesforce and 
     * uses it to calculate progress bars 
	 */
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity 
                    style={styles.block} 
                    onPress={() => this.props.navigation.navigate('Random Screen')}
                >
                    <Text style={styles.blockTitle}>
                        Competencies
                    </Text>
                    <PodProgressBar progress={this.state.compet_outcomes} total_tasks={COMPET_TOTAL_OUTCOMES} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.block} 
                    onPress={() => this.props.navigation.navigate('Random Screen')}
                >
                    <Text style={styles.blockTitle}>
                        Career Pathway
                    </Text>
                    <PodProgressBar progress={this.state.career_outcomes} total_tasks={CAREER_TOTAL_OUTCOMES} />
                </TouchableOpacity>
            
                <TouchableOpacity 
                    style={styles.block} 
                    onPress={() => this.props.navigation.navigate('Random Screen')}
                >                
                    <Text style={styles.blockTitle}>
                        Life Essentials / Support Network
                    </Text>
                    <PodProgressBar progress={this.state.life_outcomes} total_tasks={LIFE_TOTAL_OUTCOMES} />
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    block: {
        width: '100%',
        height: 180,
        backgroundColor: '#fcfcfc',
        marginTop: 40,
    },
    blockTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 30,
        marginRight: 50,
    },
});