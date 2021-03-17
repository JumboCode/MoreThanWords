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
import { getAccessToken, isTokenValid } from '../../utils/auth.js'

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: props.checked,
            ydmApproved: props.ydmApproved,
            starIsFilled: props.ydmApproved ? false : props.starIsFilled, // change second value later based on local storage
            clickable: true,
            // accessToken: null
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

    // async updateAccessToken() {
    //     this.setState({
    //         accessToken: await getAccessToken()
    //     });
    //     return this.state.accessToken
    // }

    // async componentDidMount() {
    //     await this.updateAccessToken()
    // }

    setClickable(newValue) {
        this.setState({clickable: newValue});
    }

    async updateSalesforce(updated_value, isStar) {
        success = false;
        // Make request to update checkbox
        // KNOWN ISSUE: 401 error occurring for several (but not all) tasks in the Associate pod.
        await fetch(`${Constants.manifest.extra.apiUrl}/updateCheckbox`, {
            method: 'POST',
            headers: {
                'Authorization': "Bearer " + await getAccessToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_title: isStar ? this.props.backendBoolID : this.props.backendID,
                new_value: updated_value,
                pod: this.props.pod
            })
        })
        .then(response => {
            // console.log("status code:", response.status);
            if (response.status != 200) {
                success = false;
            } else {
                success = true;
            }
        })
        .catch(error => {
            console.error(error);
            success = false;
        });
        return success;
    }

    async handleClick(isStar=False)  {
        let updated_value = isStar ? !this.state.starIsFilled : !this.state.checked;
        this.setClickable(false);
        let success = await this.updateSalesforce(updated_value, isStar);
        // console.log(success);
        if (success) {
            if (isStar) {
                this.props.handleSetOutcomeData(this.props.backendID, this.state.checked, updated_value);
                // Prevent user from clicking again until a second has passed
                this.setState({starIsFilled: updated_value}, () => {
                    setTimeout(() => { this.setClickable(true); }, 1000);
                });
            } else {
                this.props.handleSetOutcomeData(this.props.backendID, updated_value, this.state.starIsFilled);
                // Prevent user from clicking again until a second has passed
                this.setState({checked: updated_value}, () => {
                    setTimeout(() => { this.setClickable(true); }, 1000);
                });
            }
        } else {
            setTimeout(() => { this.setClickable(true); }, 1000);
        }
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
                    // KNOWN ISSUE: Clicking the star in the "Complete Getting Started Module"
                    // of the Life Essentials/Support Network Outcome causes issues, or sometimes isn't clickable.
                    onPress={this.state.ydmApproved || !this.state.clickable ? null : async () => {
                        await this.handleClick(isStar=true);
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
                    // KNOWN ISSUE: 401 error from multiple requests made in a short amount of time
                    onPress={this.state.ydmApproved || !this.state.clickable ? null : async () => {
                        await this.handleClick();
                    }}
                />
            </View>
        );
    }
}

export default Task;