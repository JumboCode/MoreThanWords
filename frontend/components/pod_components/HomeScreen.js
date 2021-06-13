import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import HomeScreenPod from './HomeScreenPod.js'
import {RefreshControl, Text} from "react-native";
import LoadingModal from "../LoadingModal";
import { getAccessToken } from '../../utils/auth.js';

const server_add = Constants.manifest.extra.apiUrl;

export default class HomeScreen extends React.Component {
    state = {
        numSucceeded: 0,
        refreshing: false,
        pods: null,
        progress_data: null
    }

    fetchData = async (set_loading = true) => {
        if (set_loading) this.setState({loading: true});
        let { pods } = this.state;
        const token = await getAccessToken();
        if (!pods) {
            const res = await fetch(server_add + "/getValidPods", {
                headers: {
                    "Authorization": "Bearer " + token
                }
            });
            pods = await res.json();
            this.setState({ pods });
        }
        const res2 = await fetch(server_add + "/calcProgressHomeScreen", {
            method: 'GET',
            headers: {
                'Authorization': "Bearer " + token,
            },
        });
        const progress_data = await res2.json();

        this.setState({ progress_data, loading: false });
    }

    componentDidMount() {
        this.fetchData(false);
    }

    render() {
        const { progress_data, pods } = this.state;
        return(
            <ScrollView
                style={{backgroundColor: '#ffffff' }}
                refreshControl={
                    <RefreshControl 
                        refreshing={this.state.refreshing} 
                        onRefresh={this.fetchData}/>}
            >
                {progress_data && pods ?
                <SafeAreaView style={{backgroundColor: '#ffffff' }}>
                    {Object.keys(pods).map((pod, index) => {
                        console.log("12333", pod);
                                return <HomeScreenPod
                                    pod={pod.slice(0, -11) /* removing suffix */}
                                    key={index}
                                    route={this.props.route}
                                    navigation={this.props.navigation}
                                    pod_data={pods[pod]}
                                    progress_data={progress_data[pod]}
                                />}
                    )}
                </SafeAreaView>  :
                <SafeAreaView style={{backgroundColor: '#ffffff' }}>
                    <LoadingModal/>
                </SafeAreaView>
                    
                }
            </ScrollView>
        );
    }
}
