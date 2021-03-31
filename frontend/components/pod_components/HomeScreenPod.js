import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js';

import ProgressBar from '../ProgressBar.js';

const server_add = Constants.manifest.extra.apiUrl;

export default class HomeScreenPod extends React.Component{
    state = {
        progress: 0, 
        total: 0,
    };
    componentDidMount(){
        let pod = this.props.pod;
        getAccessToken().then(accessToken => 
            fetch(server_add + `/calcProgressHomeScreen?pod=${pod}`, { // query for a specific pod
                "headers": {
                    "Authorization": "Bearer " + accessToken
                }
        }))
        .then(async response => {
            let data = await response.json();
            this.setState({
                progress: data.progress,
                total: data.total,
            })
        })
        .catch(function (error){
            console.log(error);
        });
    }

    render(){
        const pod_name = this.props.pod;
        const nav_pod_name = pod_name + ' Pod';
        const complete_outcomes = this.state.progress;       
        const total_outcomes = this.state.total;
        let blocktext,block;
        if (complete_outcomes != 0 && complete_outcomes == total_outcomes){
            blocktext = styles.BlockText;
            block = styles.Block;
        } else if (complete_outcomes != 0 && complete_outcomes < total_outcomes){
            blocktext = styles.highlightBlockText;
            block = styles.highlightBlock;
        } else {
            blocktext = styles.greyBlockText;
            block = styles.greyBlock;
        } 
            
        return(
        <SafeAreaView style={styles.container}>
        <TouchableOpacity 
            style={block} 
                onPress={() => 
                    this.props.navigation.navigate(nav_pod_name, {
                    pod: pod_name
                })
            }
        >
                <Text style={blocktext}> {pod_name} </Text>
            <ProgressBar progress={complete_outcomes} total_outcomes={total_outcomes} />
        </TouchableOpacity> 
    </SafeAreaView>);
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: 'white'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    Block: {
        marginTop: 20,
        width: '100%',
        height: 220,
        backgroundColor: '#ECECEC50',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    BlockText: {
        fontSize: 40,
        color: '#27b48f',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    highlightBlock: {
        marginTop: 20,
        width: '100%',
        height: 220,
        backgroundColor: '#27b48f',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    highlightBlockText: {
        fontSize: 40,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    greyBlock: {
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
    greyBlockText: {
        fontSize: 40,
        color: '#C4C4C4',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});