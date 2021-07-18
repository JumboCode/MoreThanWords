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
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { updateSalesforce } from '../../utils/tasks';

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            ydmApproved: props.ydmApproved,
            starIsFilled: props.ydmApproved ? false : props.starIsFilled, // change second value later based on local storage
            clickable: true,
            taskColor: props.ydmApproved ? "#C4C4C4" : "#3F3F3F"
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
                color: this.state.ydmApproved || !this.props.accessible ? "#C4C4C4" : "#3F3F3F",
            },
            
            checkboxContainer: {
                paddingRight: 0,
            },
            greyText: {
                flex: 1,
                textAlign: 'left',
                color: '#C4C4C4',
            },
        });
    }

    setClickable(newValue) {
        this.setState({clickable: newValue});
    }

    render() {
        let name = this.props.name;

        return (
            <View style={this.styles().taskContainer}>
                <Icon.Button
                    style={this.styles().starContainer}
                    name={this.state.starIsFilled ? "star" : "star-outline"}
                    iconStyle={this.styles().star}
                    color={!this.props.accessible || this.state.ydmApproved ? "#C4C4C4" : "#FF4646"}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    size={20}
                    onPress={!this.props.accessible || this.state.ydmApproved || !this.state.clickable ? null : () => {
                        this.setClickable(false);
                        let success = updateSalesforce(!this.state.starIsFilled, true, this.props.backendBoolID, this.props.backendID, this.props.pod);
                        if (success) {
                            this.props.handleSetOutcomeData(this.props.backendID, this.state.checked, !this.state.starIsFilled);
                            // Prevent user from clicking again until a second has passed
                            this.setState({starIsFilled: !this.state.starIsFilled}, () => {
                                setTimeout(() => { this.setClickable(true); }, 1000);
                            });
                        } else {
                            this.setClickable(true);
                        }
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
                    color={!this.props.accessible || this.state.ydmApproved ? "#C4C4C4" : "#3F3F3F"}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    onPress={!this.props.accessible || this.state.ydmApproved || !this.state.clickable ? null : () => {
                        this.setClickable(false);
                        let success = updateSalesforce(!this.state.checked, false, this.props.backendBoolID, this.props.backendID, this.props.pod);
                        if (success) {
                            this.props.handleSetOutcomeData(this.props.backendID, !this.state.checked, this.state.starIsFilled);
                            // Prevent user from clicking again until a second has passed
                            this.setState({checked: !this.state.checked}, () => {
                                setTimeout(() => { this.setClickable(true); }, 1000);
                            });
                        } else {
                            this.setClickable(true);
                        }
                    }}
                />
            </View>
        );
    }
}

export default Task;