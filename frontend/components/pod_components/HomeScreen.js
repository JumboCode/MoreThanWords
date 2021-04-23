import Constants from 'expo-constants';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import HomeScreenPod from './HomeScreenPod.js'
import {Text} from "react-native-web";
import LoadingModal from "../LoadingModal";

const server_add = Constants.manifest.extra.apiUrl;
const pods = ['Trainee', 'Associate', 'Partner']; // hardcoded pod names for data query and subsequent screens

export default class HomeScreen extends React.Component {
    state = {
        numSucceeded: 0,
    }

    incrementSucceeded = () => {
        const {numSucceeded} = this.state;
        this.setState({numSucceeded: numSucceeded + 1});
    }

    render() {
        const {numSucceeded} = this.state;
        return(
            <ScrollView
                style={{backgroundColor: '#ffffff' }}
            >
                {numSucceeded !== pods.length &&
                <SafeAreaView style={{backgroundColor: '#ffffff' }}>
                    <LoadingModal/>
                </SafeAreaView>}
                <SafeAreaView style={{backgroundColor: '#ffffff' }}>
                    {pods.map((pod, index) => {
                            return (
                                <HomeScreenPod
                                    pod={pod}
                                    key={index}
                                    route={this.props.route}
                                    navigation={this.props.navigation}
                                    renderPod={numSucceeded === pods.length}
                                    incrementSucceeded={this.incrementSucceeded.bind(this)}
                                />
                            )
                        })}
                </SafeAreaView>
            </ScrollView>
        );
    }
}
