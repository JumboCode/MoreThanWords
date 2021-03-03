import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js';

import PodProgressBar from './PodProgressBar.js';
import FocusAreaBlock from './FocusAreaBlock.js';

const server_add = Constants.manifest.extra.apiUrl;

export default class TraineePodScreen extends React.Component {
    /* State variables initalized:
     * 	  - compet_outcomes: number of completed competency outcomes 
     * 	  - career_outcomes: number of completed career pathway outcomes
     * 	  - life_outcomes: number of completed life essential outcomes 
     *    - compet_total_outcomes: total number of competency outcomes
     *    - career_total_outcomes: total number of career outcomes
     *    - life_total_outcomes: total number of life outcomes
     */
    state = {
        outcomes_list: {}, 
        array: [
            {
              key: '1',
              title: 'example title 1',
              subtitle: 'example subtitle 1',
            },
            {
              key: '2',
              title: 'example title 2',
              subtitle: 'example subtitle 2',
            },
            {
              key: '3',
              title: 'example title 3',
              subtitle: 'example subtitle 3',
            },
          ],
    };

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
                outcomes_list: data,
            })
            console.log("START! raw data: ", data);
            // if (this.state.outcomes_list && this.state.outcomes_list['CAR']) {
                console.log("completed_outcomes: ", this.state.outcomes_list['CAR']['completed_outcomes']);
            // }
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
            <ScrollView>
                <SafeAreaView style={styles.container}>     
                    {Object.entries(this.state.outcomes_list).map(([key, value]) => {
                        return (
                            <FocusAreaBlock 
                                name={this.state.outcomes_list[key]['name']}
                                completed_outcomes={this.state.outcomes_list[key]['completed_outcomes']}
                                total_outcomes={this.state.outcomes_list[key]['total_outcomes']}
                            />
                        )
                    })}

                    <TouchableOpacity 
                        style={styles.block} 
                        onPress={() => this.props.navigation.navigate('Random Screen')}
                    >
                        <Text style={styles.blockTitle}>
                            Competencies
                        </Text>
                        <PodProgressBar progress={2} total_tasks={3} />
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