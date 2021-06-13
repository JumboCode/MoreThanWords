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

    render() {
        if (!this.props.progress_data || !this.props.pod) {
            return <></>
        }
        const { pod } = this.props;
        const nav_pod_name = pod + ' Pod';
        const { checked, progress, total } = this.props.progress_data;
        const { completed, status } = this.props.pod_data;

        let blocktext, block;
        let icon;
        if (progress != 0 && progress == total) {
            blocktext = styles.BlockText;
            block = styles.Block;

            if (pod == 'Trainee') {
                icon = TRAINEE_MEDAL;
            } else if (pod == 'Associate') {
                icon = ASSOCIATE_MEDAL;
            } else {
                icon = PARTNER_MEDAL;
            }
        } else if (progress != 0 && progress < total) {
            blocktext = styles.highlightBlockText;
            block = styles.highlightBlock;
        } else {
            blocktext = styles.greyBlockText;
            block = styles.greyBlock;
        }

        return  <SafeAreaView style={styles.container}>
                    <TouchableOpacity
                        style={block}
                        onPress={() => {
                              status == "does not exist" ?
                                Alert.alert("You have not been assigned this pod. Please contact your manager or More Than Words administrator.")
                                :
                                this.props.navigation.navigate(nav_pod_name, {
                                    pod: pod,
                                    status: status,
                                    completed: completed,
                                })
                        }}
                    >
                        <Image style={styles.medal} source={icon} />
                        <Text style={blocktext}> {pod} </Text>
                        <ProgressBar 
                            progress={progress} 
                            checked={checked} 
                            total_outcomes={total} 
                        />
                    </TouchableOpacity>
                </SafeAreaView >
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