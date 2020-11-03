import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';

import {Container, Content, ProgressBar} from 'native-base';

export default class PodProgressBar extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <ProgressBar progress={30} />
                </Content>
            </Container>
        ); 
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
    },
    block: {
        marginTop: 40,
        width: 300,
        height: 180,
        backgroundColor: '#fae484',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockText: {
        fontSize: 25,
        textAlign: 'center',
    },
});