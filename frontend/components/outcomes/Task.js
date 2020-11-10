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
// import { Icon } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                width: 30,
                margin: 0,
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
                color: this.state.starIsFilled ? "#C4C4C4" : "#3F3F3F",
            },
            checkboxContainer: {
                paddingRight: 0,
                // paddingLeft: 0
            }
        });
    }

    render() {
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
                    style={this.styles().checkboxContainer}
                    name={this.state.checked ? 'check-box' : 
                          'check-box-outline-blank'}
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