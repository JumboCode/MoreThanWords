import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './components/pod_components/HomeScreen.js';
import PodScreen from './components/pod_components/PodScreen.js';
import LoginScreen from './components/LoginPage.js';
import OutcomesScreen from './components/outcomes/OutcomesScreen.js';
import FocusGoals from './components/outcomes/FocusGoals.js';

import { isTokenValid, removeToken, getAccessToken } from "./utils/auth";
import { Footer } from 'native-base';
import Constants from 'expo-constants';



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* Higher order function that returns the component binded with refresh_func */
function componentWithRefreshFunc(Component, refresh_func) {
    return function ({...rest}) {
        return <Component refresh={refresh_func} {...rest}/>
    }
}

export default class MainNavigator extends React.Component {
    state = {
        loggedIn: false
    };

    // refreshes login state, updating screen being displayed.
    refreshLoginState = () => {
        console.log("State updated.")
        isTokenValid().then(valid => {
            this.setState({loggedIn: valid});
        });
    }

    /* removes the token and refreshes the state */
    logout = async () => {
        await removeToken();
        this.refreshLoginState();
    }

    componentDidMount() {
        this.refreshLoginState();
    }

    render() {
        return (
            <NavigationContainer>
                {this.state.loggedIn ? (
                    <MainTabNavigator 
                        loggedIn={this.state.loggedIn}
                        logout={this.logout}
                    />
                ) : (
                    <Stack.Navigator>
                        <Stack.Screen
                            name="Login Screen"
                            component={componentWithRefreshFunc(LoginScreen, this.refreshLoginState)}
                            options={{
                                headerShown: false,
                                animationEnabled: false
                            }}
                        />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        );
    }
}

class MainTabNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: {},
            timesChanged: 0
        };
    }

    handleSetAllData = (backendID, updatedCheckboxValue, updatedStarValue, pod) => {
        let dataTemp = this.state.allData;
        // console.log(backendID, updatedCheckboxValue, updatedStarValue, pod);
        // console.log(this.state.allData[pod]);
        let outcomeID = backendID.substring(0, 3);
        let outcomeIndex = this.state.allData[pod].findIndex(x => x.id === outcomeID);
        // console.log(outcomeIndex);
        if (outcomeIndex >= 0) {
            let index = this.state.allData[pod][outcomeIndex].content.findIndex(x => x.api_key === backendID);
            // console.log(this.state.allData[pod][outcomeIndex]);
            if (index >= 0) {
                dataTemp[pod][outcomeIndex].content[index].checked = updatedCheckboxValue;
                dataTemp[pod][outcomeIndex].content[index].starIsFilled = updatedStarValue;
                // console.log(dataTemp);
                this.setState({allData: dataTemp, timesChanged: this.state.timesChanged + 1});
            } else {
                console.error("Unable to identify task index.");
            }
        } else {
            console.error("Unable to identify outcome index.");
        }
    };

    async componentDidMount() {
        if (!this.props.loggedIn) {
            console.log("Component mount and not logged in");
            return;
        } else {
            console.log("Component mount and logged in");
            await fetch(`${Constants.manifest.extra.apiUrl}/getMainGoals`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + await getAccessToken(),
                },
            })
            .then(response => response.json())
            .then(queryData => {
                let allData = {};
                
                // Extract all outcome titles for later use
                for (const podName in queryData) {
                    let newData = [];
                    let data = queryData[podName];
                    
                    function findAndUpdate(key, index, fieldName, getKey=false) {
                        // Get ID of the current key so we can match with existing entry
                        let words_in_key = key.split("_");
                        let curr_id = words_in_key[words_in_key.length - 3].toLowerCase();
                        // Finds index of object in content array to update
                        let content_index = newData[index].content.findIndex(x => {
                            return x.id === curr_id;
                        });
                        // If the corresponding youth exists for the YDM field, update the value
                        if (content_index >= 0) {
                            // Update ydmApproved field in existing entry
                            if (getKey) {
                                newData[index].content[content_index][fieldName] = key;
                            } else {
                                newData[index].content[content_index][fieldName] = data[key]["value"];
                            }
                        }
                    }

                    for (const api_name in data) {
                        // console.log(api_name);
                        if (api_name.includes("Outcome") && !api_name.includes("Outcomes")) {
                            newData.push({
                                id: api_name.substring(0, 3),
                                title: data[api_name]["name"],
                                content: []
                            });
                        }
                    }

                    // Create all content objects based on the youth fields
                    for (const key in data) {
                        let key_id = key.substring(0, 3);
                        let index = newData.findIndex(x => x.id === key_id);
                        if (key.includes("Youth") && index >= 0 && !key.includes("BOOL")) {
                            let words_in_key = key.split("_");
                            newData[index].content.push({
                                api_key: key,
                                api_bool_key: "", // Change in next loop
                                id: words_in_key[words_in_key.length - 3].toLowerCase(),
                                key: data[key]["name"],
                                ydmApproved: true,
                                checked: data[key]["value"],
                                starIsFilled: false, // Change in next loop
                                pod: podName
                            });
                        }
                    }

                    // Update all ydmApproved values based on YDM fields
                    for (const key in data) {
                        let key_id = key.substring(0, 3);
                        let index = newData.findIndex(x => x.id === key_id);
                        if (key.includes("YDM") && index >= 0) {
                            findAndUpdate(key, index, "ydmApproved");
                        }
                        if (key.includes("BOOL") && index >= 0) {
                            findAndUpdate(key, index, "starIsFilled");
                            findAndUpdate(key, index, "api_bool_key", getKey=true);
                        }
                    }

                    allData[podName] = newData;
                }

                this.setState({
                    allData: allData
                });

                // console.log(allData);

            })
            .catch((error) => {
                console.error(error);
            });
        }
    }

    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    children={ () => <MainStackNavigator 
                                        logout={this.props.logout}
                                        handleSetAllData={this.handleSetAllData}
                                        allData={this.state.allData}
                                     /> }
                    options={{
                        tabBarLabel: 'Main Screen',
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                            name="outlet"
                            color={color}
                            size={size}
                            />
                        ),
                    }} 
                />
                <Tab.Screen 
                    name="FocusGoals"
                    children={ () => <FocusGoalsStackNavigator
                                        allData={this.state.allData}
                                        timesChanged={this.state.timesChanged}
                                        handleSetAllData={this.handleSetAllData}
                                     />}
                    options={{
                        tabBarLabel: 'Focus Goals',
                        tabBarIcon: ({ color, size }) => (
                            <Icon
                            name="playlist-add-check"
                            color={color}
                            size={size}
                            />
                        ),
                    }} 
                />
            </Tab.Navigator>
        );
    }
}

class FocusGoalsStackNavigator extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log("FocusGoalsStackNavigator");
        return (
            <Stack.Navigator>
                <Stack.Screen 
                    name="Focus Goals"
                    children={ () => <FocusGoals
                                        allData={this.props.allData}
                                        timesChanged={this.props.timesChanged}
                                        handleSetAllData={this.props.handleSetAllData}
                                     />} 
                />
            </Stack.Navigator>
        );
    }
}

class MainStackNavigator extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Stack.Navigator>
                <>
                    <Stack.Screen
                        name="Pods"
                        component={HomeScreen}
                        options={{
                            headerTitleAlign: 'center',
                            headerLeft: () =>
                                <TouchableOpacity onPress={this.logout} style={{marginLeft: 16}}>
                                    <Text style={{fontSize: 11, color: "#007aff"}}>LOGOUT</Text>
                                </TouchableOpacity>,
                            animationEnabled: false
                        }}
                    />
                    <Stack.Screen 
                        name="Trainee Pod" 
                        component={PodScreen} 
                        options={{
                            headerTitleAlign: 'center',
                            headerBackImage: () => (
                                <Image source={require("./arrow_back.png")} style={{ width: 20, height: 20, marginLeft: 16}} />
                            ),
                            headerBackTitleVisible: false
                        }} />
                    <Stack.Screen 
                        name="Associate Pod" 
                        component={PodScreen} 
                        options={{
                            headerTitleAlign: 'center',
                            headerBackImage: () => (
                                <Image source={require("./arrow_back.png")} style={{ width: 20, height: 20, marginLeft: 16}} />
                            ),
                            headerBackTitleVisible: false
                        }}/>
                    <Stack.Screen 
                        name="Partner Pod" 
                        component={PodScreen} 
                        options={{
                            headerTitleAlign: 'center',
                            headerBackImage: () => (
                                <Image source={require("./arrow_back.png")} style={{ width: 20, height: 20, marginLeft: 16}} />
                            ),
                            headerBackTitleVisible: false
                        }}/>
                    <Stack.Screen 
                        name="Outcomes" 
                        component={OutcomesScreen} 
                        options={{
                            headerTitleAlign: 'center',
                            headerBackImage: () => (
                                <Image source={require("./arrow_back.png")} style={{ width: 20, height: 20, marginLeft: 16}} />
                            ),
                            headerBackTitleVisible: false
                    }}/>
                </>
            </Stack.Navigator>
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
    scrollView: {
        backgroundColor: 'white'
    }
});
