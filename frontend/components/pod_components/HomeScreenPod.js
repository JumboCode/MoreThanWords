import React from 'react';
import { StyleSheet, Text, Image, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js';

import ProgressBar from '../ProgressBar.js';

const server_add = Constants.manifest.extra.apiUrl;
const error_message = "This pod is not clickable because it hasn't been generated yet. If you think this is a mistake, please contact your More Than Words manager. "
const TRAINEE_MEDAL = require('./trainee_medal.png');
const ASSOCIATE_MEDAL = require('./associate_medal.png');
const PARTNER_MEDAL = require('./partner_medal.png');

export default class HomeScreenPod extends React.Component {
    state = {
        isLoading: true,
        progress: 0,

        total: 0,
        status: "",
        completed: ""
    };

    async fetchData() {
        try {
            const { pod, incrementSucceeded } = this.props;

            const token = await getAccessToken();
            const podsResponse = await fetch(server_add + `/getValidPods`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + token,
                },
            });
            const podsData = await podsResponse.json();
            const thispoddata = podsData[pod + '_POD_Map__c'];

            const HomepodsResponse = await fetch(server_add + `/calcProgressHomeScreen?pod=${pod}`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + token,
                },
            });
            const HomepodsData = await HomepodsResponse.json();

            this.setState({
                isLoading: false,
                progress: HomepodsData.progress,
                total: HomepodsData.total,
                status: thispoddata.status,
                completed: thispoddata.completed,
            })
            incrementSucceeded();
        } catch (e) {
            console.error(e);
        }
    };

    componentDidMount() {
        this.fetchData();
    }

    render() {
        const pod_name = this.props.pod;
        const nav_pod_name = pod_name + ' Pod';
        const complete_outcomes = this.state.progress;
        const total_outcomes = this.state.total;
        const pod_status = this.state.status;
        const pod_completed = this.state.completed;
        const { renderPod } = this.props;

        let blocktext, block;
        let icon;
        if (complete_outcomes != 0 && complete_outcomes == total_outcomes) {
            blocktext = styles.BlockText;
            block = styles.Block;

            if (pod_name == 'Trainee') {
                icon = TRAINEE_MEDAL;
            } else if (pod_name == 'Associate') {
                icon = ASSOCIATE_MEDAL;
            } else {
                icon = PARTNER_MEDAL;
            }
        } else if (complete_outcomes != 0 && complete_outcomes < total_outcomes) {
            blocktext = styles.highlightBlockText;
            block = styles.highlightBlock;
        } else {
            blocktext = styles.greyBlockText;
            block = styles.greyBlock;
        }

        return (
            this.state.isLoading || !renderPod ?
                // If data hasn't loaded, then display a blank screen
                <SafeAreaView style={styles.container}></SafeAreaView>
                :
                <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={block}
                        onPress={() => {
                            this.state.status == "does not exist" ?
                                Alert.alert("You have not been assigned this pod. Please contact your manager or More Than Words administrator.")
                                :
                                this.props.navigation.navigate(nav_pod_name, {
                                    pod: pod_name,
                                    status: pod_status,
                                    completed: pod_completed,
                                })
                        }}
                    >
                        <Image style={styles.medal} source={icon} />
                        <Text style={blocktext}> {pod_name} </Text>
                        <ProgressBar progress={complete_outcomes} total_outcomes={total_outcomes} />
                        <ProgressBar progress={complete_outcomes} total_outcomes={total_outcomes} />
                    </TouchableOpacity>
                </SafeAreaView >
        );
    }
}

const styles = StyleSheet.create({
    medal: {
        position: 'absolute',
        left: 4,
        top: 10,
        width: 42,
        height: 42,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        // justifyContent: 'center',
        justifyContent: 'space-evenly',
    },

    Block: {
        marginTop: 32,
        width: '100%',
        height: 170,
        backgroundColor: '#fcfcfc',

        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#b4b4b4",
        shadowOffset: { height: 2 },
        shadowRadius: 0.5,
        shadowOpacity: 0.25,
    },

    BlockText: {
        fontSize: 48,
        color: '#27b48f',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    highlightBlock: {
        marginTop: 32,
        width: '100%',
        height: 170,
        backgroundColor: '#27b48f',

        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#b4b4b4",
        shadowOffset: { height: 2 },
        shadowRadius: 0.5,
        shadowOpacity: 0.25,
    },

    highlightBlockText: {
        fontSize: 48,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    greyBlock: {
        width: '100%',
        height: 170,
        backgroundColor: '#fcfcfc',
        marginTop: 32,

        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#b4b4b4",
        shadowOffset: { height: 2 },
        shadowRadius: 0.5,
        shadowOpacity: 0.25,
    },

    greyBlockText: {
        fontSize: 48,
        color: '#e5e5e5',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});