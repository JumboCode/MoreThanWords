import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js';

import FocusAreaBlock from './FocusAreaBlock.js';
const server_add = Constants.manifest.extra.apiUrl;

export default class TraineePodScreen extends React.Component {
    /* State variables initalized:
     * 	  - outcomes_list: a dictionary of dictionaries. values are field 
     *      names (ex. COM, CAR) that each map to another dictionary with 
     *      respective name, completed_outcomes count, total_outcomes count
     */
    state = {
        outcomes_list: {},
    };

    /* componentDidMount
	 * Parameters: none
	 * Returns: nothing
	 * Purpose: Get the data from backend and use the info to set states
	 */
    componentDidMount() {
        getAccessToken().then(accessToken => 
            fetch(server_add + '/calcProgressPodScreen', {
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
            console.log("raw data: ", data);
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
        const numbers = [1, 2, 3, 4, 5];
        return (
            <ScrollView>
                <SafeAreaView style={styles.container}>     
                    {Object.entries(this.state.outcomes_list).map(([key, value], numbers) => {
                        const dict = this.state.outcomes_list;
                        return (
                            <FocusAreaBlock 
                                name={dict[key]['name']}
                                completed_outcomes={dict[key]['completed_outcomes']}
                                total_outcomes={dict[key]['total_outcomes']}
                                key={numbers}
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