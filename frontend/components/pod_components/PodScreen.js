import Constants from 'expo-constants';
import React from 'react';
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { getAccessToken } from '../../utils/auth.js';
import FocusAreaBlock from './FocusAreaBlock.js';

const server_add = Constants.manifest.extra.apiUrl;

export default class PodScreen extends React.Component {
    /* State variables initalized:
     * 	  - outcomes_list: a dictionary of dictionaries. values are field 
     *      names (ex. COM, CAR) that each map to another dictionary with 
     *      respective name, completed_outcomes count, total_outcomes count
     */
    state = {
        outcomes_list: {},
        data_loaded: false,
    };
    
    /* componentDidMount
	 * Parameters: none
	 * Returns: nothing
	 * Purpose: Get the data from backend and use the info to set states
	 */
    componentDidMount() {
        let pod = this.props.route.params.pod;
        getAccessToken().then(accessToken => 
            fetch(server_add + `/calcProgressPodScreen?pod=${pod}`, {
                headers: {
                    "Authorization": "Bearer " + accessToken
                }
            })
        )
        .then(async response => {
            let data = await response.json();
            this.setState({
                outcomes_list: data,
                data_loaded: true,
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
     * uses it to calculate progress bars. Renders a loading circle before 
     * data has been loaded.
     * Note: map function needs a specific numbered ID key for each list item 
	 */
    render() {
        let IDkey = 0;
        const dict = this.state.outcomes_list;
        //If data has loaded, then render the FocusAreaBlock
        if (this.state.data_loaded) {
            return (
                <ScrollView>
                    <SafeAreaView style={styles.container}>
                        {Object.entries(dict).map(([key, value]) => {
                            IDkey++;
                            return (
                                <FocusAreaBlock 
                                    pod={key}
                                    name={dict[key]['name']}
                                    completed_outcomes={dict[key]['completed_outcomes']}
                                    total_outcomes={dict[key]['total_outcomes']}
                                    key={IDkey}
                                    route={this.props.route}
                                    navigation={this.props.navigation}
                                />
                            )
                        })}
                    </SafeAreaView>
                </ScrollView>
            ); 
        }
        //If data hasn't loaded, display loading circle
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        backgroundColor: 'white',
    },
});