import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import { getAccessToken } from '../../utils/auth.js';

import PodProgressBar from './PodProgressBar.js';

const server_add = Constants.manifest.extra.apiUrl;

export default class TraineePodScreen extends React.Component {
    constructor(props) {
        super(props);

        /* State variables initalized:
        *    - compet_outcomes: number of completed competency outcomes 
        *    - career_outcomes: number of completed career pathway outcomes
        *    - life_outcomes: number of completed life essential outcomes 
        *    - compet_total_outcomes: total number of competency outcomes
        *    - career_total_outcomes: total number of career outcomes
        *    - life_total_outcomes: total number of life outcomes
        */
        this.state = {
            compet_outcomes: 0, 
            career_outcomes: 0,
            life_outcomes: 0,
            compet_total_outcomes: 0,
            career_total_outcomes: 0,
            life_total_outcomes: 0,
        };
    }

    /* componentDidMount
	 * Parameters: none
	 * Returns: nothing
	 * Purpose: Get the data from backend and use the info to set states
	 */
    componentDidMount() {
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
                compet_outcomes: data.records[0].TR_Competency_Completed__c,
                career_outcomes: data.records[0].TR_CareerExpl_Completed__c,
                life_outcomes: data.records[0].TR_LifeEssentials_Completed__c,
                compet_total_outcomes: data.COM_totalcount,
                career_total_outcomes: data.CAR_totalcount,
                life_total_outcomes: data.LIF_totalcount,
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
            <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity 
                    style={styles.block} 
                    onPress={() => {
                        const { pod } = this.props.route.params;
                        this.props.navigation.navigate('Outcomes', {
                            pod: pod,
                            focus_area: "COM",
                            title: "Competencies"
                        });
                    }}
                >
                    <Text style={styles.blockTitle}>
                        Competencies
                    </Text>
                    <PodProgressBar progress={this.state.compet_outcomes} total_tasks={this.state.compet_total_outcomes} />
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.block} 
                    onPress={() => {
                        const { pod } = this.props.route.params;
                        this.props.navigation.navigate('Outcomes', {
                            pod: pod,
                            focus_area: "CAR",
                            title: "Career Pathway"
                        });
                    }}
                >
                    <Text style={styles.blockTitle}>
                        Career Pathway
                    </Text>
                    <PodProgressBar progress={this.state.career_outcomes} total_tasks={this.state.career_total_outcomes} />
                </TouchableOpacity>
            
                <TouchableOpacity 
                    style={styles.block}
                    onPress={() => {
                        const { pod } = this.props.route.params;
                        this.props.navigation.navigate('Outcomes', {
                            pod: pod,
                            focus_area: "LIF",
                            title: "Life Essentials / Support Network"
                        });
                    }}
                >                
                    <Text style={styles.blockTitle}>
                        Life Essentials / Support Network
                    </Text>
                    <PodProgressBar progress={this.state.life_outcomes} total_tasks={this.state.life_total_outcomes} />
                </TouchableOpacity>
            </SafeAreaView>
            </ScrollView>
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
    scrollView: {
        backgroundColor: 'white'
    }
});