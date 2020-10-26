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

import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View} from 'react-native';
// import { Icon } from 'react-native-elements';
// import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialIcons'

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            starIsFilled: props.starIsFilled,
        };
    }

    styles() {
        return StyleSheet.create({
            star: {
                flex: 1,
                margin: 0,
            },
            taskContainer: {
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
            },
            checkbox: {
                flex: 1,
                margin: 0
            },
            text: {
                flex: 6,
                textAlign: 'left',
                color: this.state.starIsFilled ? "#C4C4C4" : "#3F3F3F"
            }
        });
    }

    render() {
        // let starIsFilled = this.state.starIsFilled;
        let name = this.props.name;

        return (
            <View style={this.styles().taskContainer}>
                <Icon
                    name={this.state.starIsFilled ? "star" : "star-border"}
                    color={this.state.starIsFilled ? "#C4C4C4" : "#FF4646"}
                    size={20}
                    style={this.styles().star}
                />

                <Text style={this.styles().text}>
                    {name}
                </Text>

                <Icon.Button
                    name={this.state.checked ? 'check-box' : 'check-box-outline-blank'}
                    iconStyle={this.styles().checkbox}
                    color={this.state.starIsFilled ? "#C4C4C4" : "#3F3F3F"}
                    backgroundColor='transparent'
                    underlayColor='transparent'
                    onPress={this.state.starIsFilled ? null : () => {
                        this.setState({checked: !this.state.checked});
                    }}
                />
            </View>
        );
    }
}

export default Task;