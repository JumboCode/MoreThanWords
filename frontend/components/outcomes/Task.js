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

import Constants from 'expo-constants';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAccessToken } from '../../utils/auth.js';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            ydmApproved: props.ydmApproved,
            starIsFilled: props.ydmApproved ? false : props.starIsFilled, // change second value later based on local storage
            clickable: true
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

    setClickable(newValue) {
        this.setState({clickable: newValue});
    }

    async updateSalesforce() {
        let updated_value = !this.state.checked

        // Make request to update checkbox
        await fetch(`${Constants.manifest.extra.apiUrl}/updateCheckbox`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + await getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_title: this.props.backendID,
                new_value: updated_value,
                pod: this.props.pod
            })
        })
        .catch(error => {
            console.error(error);
        });
    }

    render() {
        let name = this.props.name;

        return (
            <View style={this.styles().taskContainer}>
                <Icon.Button
                    style={this.styles().starContainer}
                    name={this.state.starIsFilled ? "star" : "star-outline"}
                    iconStyle={this.styles().star}
                    color={this.state.ydmApproved ? "#C4C4C4" : "#FF4646"}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    size={16}
                    onPress={this.state.ydmApproved ? null : () => {
                        this.props.handleSetOutcomeData(this.props.backendID, this.state.checked, !this.state.starIsFilled);
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
                    name={this.state.checked ? 'checkbox-outline' : 
                          'square-outline'}
                    iconStyle={this.styles().checkbox}
                    color={this.state.ydmApproved ? "#C4C4C4" : "#3F3F3F"}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    size={18}
                    // KNOWN ISSUE: 401 error from multiple requests made in a short amount of time
                    onPress={this.state.ydmApproved || !this.state.clickable ? null : () => {
                        this.setClickable(false);
                        this.updateSalesforce();
                        this.props.handleSetOutcomeData(this.props.backendID, !this.state.checked, this.state.starIsFilled);
                        // Prevent user from clicking again until a second has passed
                        this.setState({checked: !this.state.checked}, () => {
                            setTimeout(() => { this.setClickable(true); }, 1000);
                        });
                    }}
                />
            </View>
        );
    }
}

export default Task;