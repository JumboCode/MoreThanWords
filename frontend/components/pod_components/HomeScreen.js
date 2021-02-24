import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js';
// import axios from 'axios';

import ProgressBar from '../ProgressBar.js';
import Axios from 'axios';

const   TRAINEE_TOTAL_OUTCOMES = 7
const ASSOCIATE_TOTAL_OUTCOMES = 11
const   PARTNER_TOTAL_OUTCOMES = 9

const server_add = Constants.manifest.extra.apiUrl;

export default class HomeScreen extends React.Component{
    
    state = {
        Trainee_progress: 0, 
        Associate_progress: 0,
        Partner_progress: 0
    };

    componentDidMount(){
        getAccessToken().then(accessToken => 
            fetch(server_add + '/calculateProgressBar', {
                "headers": {
                    "Authorization": "Bearer " + accessToken
                }
        }))
        .then(async response => {
            let data = await response.json();
            console.log(data);
            this.setState({
                Trainee_progress: data.Trainee_sum,
                // should change to *data.Associate_sum*
                Associate_progress: 0,
                // should change to *data.Partner_sum*
                Partner_progress: 0
                
            })
        })
        .catch(function (error) {
            // TODO: error message 
            // no progress to display, if you think it's an error
            // component
            console.log(error);
        });
    }

    render(){
        // Currently only have fake data, need to compare between real data
        const iscompleted = true;
        let displayBlock;
        let displayBlockText;
        let ProgressBarDisplay;
        let ProgressBarText;
        let ProgressBarFill;
            if (iscompleted) {
                displayBlock = styles.completedBlock;
                displayBlockText = styles.completedBlockText;
                ProgressBarDisplay = styles.completedBlockProgressBar;
                ProgressBarDisplayText = styles.completedBlockProgressBarText;
                ProgressBarFill = styles.completedBlockProgressBarFill;
            } else{
                displayBlock = styles.block;
            }
           
        return(
        <SafeAreaView style={styles.container}>
        <TouchableOpacity 
            style={displayBlock} 
            onPress={() => this.props.navigation.navigate('Trainee Pod')}
        >
                <Text style={displayBlockText}> Trainee </Text>
            <ProgressBar style={ProgressBarDisplay} Textstyle={ProgressBarText} fill={ProgressBarFill} progress={this.state.Trainee_progress} total_outcomes={TRAINEE_TOTAL_OUTCOMES} />
        </TouchableOpacity>
      
        <TouchableOpacity 
            style={displayBlock} 
            onPress={() => this.props.navigation.navigate('Associate Pod')}
        >
            <Text style={displayBlockText}> Associate </Text>
            <ProgressBar style={ProgressBarDisplay} Textstyle={ProgressBarText} fill={ProgressBarFill} progress={this.state.Associate_progress} total_outcomes={ASSOCIATE_TOTAL_OUTCOMES} />
        </TouchableOpacity>
    
        <TouchableOpacity 
            style={displayBlock} 
            onPress={() => this.props.navigation.navigate('Partner Pod')}
        >                
            <Text style={displayBlockText}> Partner </Text>
            <ProgressBar style={ProgressBarDisplay} Textstyle={ProgressBarText} fill={ProgressBarFill} progress={this.state.Partner_progress} total_outcomes={PARTNER_TOTAL_OUTCOMES} />
        </TouchableOpacity>
    </SafeAreaView>);
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    completedBlock: {
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
    completedBlockText: {
        fontSize: 40,
        // fontFamily: 'Roboto',
        color: '#27b48f',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    completedBlockProgressBar: {
        flexDirection: 'row',
        height: 20,
        width: 250,
        backgroundColor: 'white',
        borderColor: '#27b48f', 
        borderWidth: 2,
        borderRadius: 10,
    },
    completedBlockProgressBarText: {
        color: '#27b48f',
        fontFamily: 'Roboto',
    },
    completedBlockProgressBarFill: {
        color: '#27b48f',
        fontFamily: 'Roboto',
    },

    // ONGOING Block
    ongoingBlock: {
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
    ongoingBlockText: {
        fontSize: 40,
        fontFamily: 'Roboto',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // TODO Block
    todoBlock: {
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
    todoBlockText: {
        fontSize: 40,
        fontFamily: 'Roboto',
        color: '#9e9e9e',
        fontWeight: 'bold',
        textAlign: 'center',
    },  
});