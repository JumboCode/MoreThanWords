import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js';

import ProgressBar from '../ProgressBar.js';

const server_add = Constants.manifest.extra.apiUrl;


export default class HomeScreenPod extends React.Component{
    state = {
        progress: 0, 
        total: 0,
        status: "",
        completed: ""
    };
    

    async fetchData() {
        try{
            let pod = this.props.pod;

            const token = await getAccessToken();
            const podsResponse =  await fetch(server_add + `/getValidPods`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + token,
                },
            });
            const podsData = await podsResponse.json();
            const thispoddata = podsData[pod + '_POD_Map__c'];

            const HomepodsResponse =  await fetch(server_add + `/calcProgressHomeScreen?pod=${pod}`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + token,
                },
            });
            const HomepodsData = await HomepodsResponse.json();
            
            this.setState({
                progress: HomepodsData.progress,
                total: HomepodsData.total,
                status: thispoddata.status, 
                completed: thispoddata.completed,
            })
        } catch(e){
            console.error(e);
        }
    };  
    

    componentDidMount(){
        this.fetchData();
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
            onPress={() => {
                this.state.status == "does not exist" ?
                    Alert.alert("You have not been assigned this pod. Please contact your manager or More Than Words administrator.") 
                :
                    this.props.navigation.navigate(nav_pod_name, {
                        pod: pod_name,
                        status: this.state.status,
                        completed: this.state.completed,
                    })
            }}
        >
                <Text style={blocktext}> {pod_name} </Text>
            <ProgressBar progress={complete_outcomes} total_outcomes={total_outcomes} />
        </TouchableOpacity> 
    </SafeAreaView>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        justifyContent: 'space-evenly',
    },

    Block: {
        marginTop: 32,
        width: '100%',
        height: 170,
        backgroundColor: '#ECECEC50',

        alignItems: 'center',
        justifyContent: 'center',
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
        borderColor: '#ffffff',

        alignItems: 'center',
        justifyContent: 'center',

        shadowColor: "#b4b4b4",
        shadowOffset: { height: 2 },
        shadowRadius: 0.5,
        shadowOpacity: 0.4,
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
        shadowOpacity: 0.4,
    },

    greyBlockText: {
        fontSize: 48,
        color: '#e5e5e5',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});