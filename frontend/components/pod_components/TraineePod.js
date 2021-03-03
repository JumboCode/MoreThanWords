import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js';

import PodProgressBar from './PodProgressBar.js';
import FocusAreaBlock from './FocusAreaBlock.js';

const server_add = Constants.manifest.extra.apiUrl;

export default class TraineePodScreen extends React.Component {
    /* State variables initalized:
     * 	  - outcomes_list: a dictionary of dictionaries. values are field 
     *      names (ex. COM, CAR) that each map to another dictionary with 
     *      respective name, completed_outcomes count, total_outcomes count
     */
    state = {
<<<<<<< HEAD
        outcomes_list: {},
=======
        outcomes_list: {}, 
>>>>>>> 9392deb7a6200e395ef46cfe93cf2f166f8ef74b
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
    scrollView: {
        backgroundColor: 'white'
    }
});