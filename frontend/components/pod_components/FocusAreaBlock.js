import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';
import { getAccessToken } from '../../utils/auth.js';

import PodProgressBar from './PodProgressBar.js';

const server_add = Constants.manifest.extra.apiUrl;


export default class FocusAreaBlock extends React.Component {    
    constructor(props) {
        super(props);
    }
    
    render() {
        const outcomes = this.props.outcomes;
        // const total_outcomes = this.props.outcomes['completed_outcomes'];
        
        console.log("focusarea block console: ", this.props.outcomes);
        
        return (     
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => this.props.navigation.navigate('Random Screen')}
            >
                <Text style={styles.blockTitle}>
                    {this.props.name} 
                </Text>
                <PodProgressBar progress={2} total_tasks={3} />
            </TouchableOpacity>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 20,
    },
    block: {
        width: '100%',
        height: 180,
        backgroundColor: '#fcfcfc',
        marginTop: 40,
    },
    blockTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 30,
        marginRight: 50,
    },
});