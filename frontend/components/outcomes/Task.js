/*
 * Task.js
 *
 * Summary: Represents a single task for a user of the app to complete. Can be
 *          checked off by the user, but must be verified by a Salesforce
 *          client to be fully completed.
 * 
 * Representation:
 *     1) A checkbox for the user to check off the task.
 *     2) A star representing whether the task has been checked off on
 *        Salesforce.
 *     3) The name of the task.
 */

import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import axios from 'axios';

import { getAccessToken } from '../../utils/auth.js'

const server_add = Constants.manifest.extra.apiUrl;

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            ydmApproved: props.ydmApproved,
            starIsFilled: props.ydmApproved ? false : true, // change second value later based on local storage
        };
    }

    styles() {
        return StyleSheet.create({
            starContainer: {
                paddingRight: 0,
                paddingLeft: 0,
            },
            star: {
                width: 30,
                margin: 0,
                marginRight: 0,
                marginLeft: 0,
            },
            taskContainer: {
                flexDirection: 'row',
                alignItems: 'center',
            },
            checkbox: {
                margin: 0,
                marginRight: 0,
            },
            text: {
                flex: 1,
                textAlign: 'left',
                color: this.state.ydmApproved ? "#C4C4C4" : "#3F3F3F",
            },
            checkboxContainer: {
                paddingRight: 0,
            }
        });
    }

    async updateSalesforce() {
        let updated_value = !this.state.checked

        console.log(JSON.stringify(data));

        await fetch(`${Constants.manifest.extra.apiUrl}/updateCheckbox`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + await getAccessToken()
            },
            body: {
                task_title: this.props.backendID,
                new_value: updated_value,
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });

        // axios.post(server_add + "/updateCheckbox", {
        //     tr_pod_id: 'a1M0d000004i9IREAY', // Need to change this later
        //     task_title: this.props.backendID,
        //     new_value: updated_value
        // }).catch(error => {
        //     console.error(error);
        // });
    }

    render() {
        let name = this.props.name;

        return (
            <View style={this.styles().taskContainer}>
                <Icon.Button
                    style={this.styles().starContainer}
                    name={this.state.starIsFilled ? "star" : "star-border"}
                    iconStyle={this.styles().star}
                    color={this.state.ydmApproved ? "#C4C4C4" : "#FF4646"}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    size={20}
                    onPress={this.state.ydmApproved ? null : () => {
                        this.setState({starIsFilled: !this.state.starIsFilled});
                        // Add functionality for keeping the state (local or Salesforce)
                        // If the star is now filled, add the current task to the "Favorites" section
                    }}
                />

                <Text style={this.styles().text}>
                    {name}
                </Text>

                <Icon.Button
                    style={this.styles().checkboxContainer}
                    name={this.state.checked ? 'check-box' : 
                          'check-box-outline-blank'}
                    iconStyle={this.styles().checkbox}
                    color={this.state.ydmApproved ? "#C4C4C4" : "#3F3F3F"}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    onPress={this.state.ydmApproved ? null : () => {
                        this.updateSalesforce();
                        this.setState({checked: !this.state.checked});
                    }}
                />
            </View>
        );
    }
}

export default Task;