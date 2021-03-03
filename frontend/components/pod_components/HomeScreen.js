import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js';
import ProgressBar from '../ProgressBar.js';

const server_add = Constants.manifest.extra.apiUrl;

export default class HomeScreen extends React.Component{
    state = {
        Trainee_progress: 0, 
        Trainee_total: 0,
        Associate_progress: 0,
        Associate_total: 0,
        Partner_progress: 0,
        Partner_total: 0,
    };
    componentDidMount(){
        getAccessToken().then(accessToken => 
            fetch(server_add + '/calcProgressHomeScreen', {
                "headers": {
                    "Authorization": "Bearer " + accessToken
                }
        }))
        .then(async response => {
            let data = await response.json();
            console.log(data);
            this.setState({
                Trainee_progress: data.Trainee_complete,
                Trainee_total: data.Trainee_total,
                Associate_progress: data.Associate_outcome,
                Associate_total: data.Associate_total,
                Partner_progress: 1, // should change to *data.Partner_sum* data.Associate_sum
                Partner_total: data.Partner_total,
            })
        })
        .catch(function (error) {
            // TODO: error message 
            // no progress to display, 
            // component
            console.log(error);
        });
    }

    render(){
        let T_displayBlock = styles.Block;
        let A_displayBlock = styles.Block;
        let P_displayBlock = styles.Block;
        let T_displayBlockText = styles.BlockText;
        let A_displayBlockText = styles.BlockText;
        let P_displayBlockText = styles.BlockText;
        if (this.state.Trainee_progress < this.state.Trainee_total){ // highlight Trainee
            T_displayBlock = styles.highlightBlock;
            T_displayBlockText = styles.highlightBlockText;
        } else if(this.state.Associate_progress < this.state.Associate_total){ // highlight Associate
            A_displayBlock = styles.highlightBlock;
            A_displayBlockText = styles.highlightBlockText;
        } else { // highlight Partner
            P_displayBlock = styles.highlightBlock;
            P_displayBlockText = styles.highlightBlockText;
        }
           
        return(
        <SafeAreaView style={styles.container}>
        <TouchableOpacity 
            style={T_displayBlock} 
            onPress={() => this.props.navigation.navigate('Trainee Pod')}
        >
                <Text style={T_displayBlockText}> Trainee </Text>
            <ProgressBar   progress={this.state.Trainee_progress} total_outcomes={this.state.Trainee_total} />
        </TouchableOpacity>
      
        <TouchableOpacity className="sidebar"
            style={A_displayBlock} 
            onPress={() => this.props.navigation.navigate('Associate Pod')}
        >
            <Text style={A_displayBlockText}> Associate </Text>
            <ProgressBar progress={this.state.Associate_progress} total_outcomes={this.state.Associate_total} />
        </TouchableOpacity>
    
        <TouchableOpacity 
            style={P_displayBlock} 
            onPress={() => this.props.navigation.navigate('Partner Pod')}
        >                
            <Text style={P_displayBlockText}> Partner </Text>
            <ProgressBar  progress={this.state.Partner_progress} total_outcomes={this.state.Partner_total} />
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
    Block: {
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
    BlockText: {
        fontSize: 40,
        // fontFamily: 'Roboto',
        color: '#27b48f',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    // ONGOING Block
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
        // fontFamily: 'Roboto',
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});