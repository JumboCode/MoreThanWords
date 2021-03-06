
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './components/pod_components/HomeScreen.js';
import TraineePodScreen from './components/pod_components/TraineePod.js';
import AssociatePodScreen from './components/pod_components/AssociatePod.js';
import PartnerPodScreen from './components/pod_components/PartnerPod.js';
import LoginScreen from './components/LoginPage.js';
import OutcomesScreen from './components/outcomes/OutcomesScreen.js';
import FocusGoals from './components/outcomes/FocusGoals.js';

import { isTokenValid, removeToken } from "./utils/auth";
import { Footer } from 'native-base';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/* Higher order function that returns the component binded with refresh_func */
function componentWithRefreshFunc(Component, refresh_func) {
    return function ({...rest}) {
        return <Component refresh={refresh_func} {...rest}/>
    }
}

export default class MainTabNavigator extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name="Home"
                        children={ () => <MainStackNavigator/> }
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
                        children={ () => <FocusGoals/> }
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
            </NavigationContainer>
        );
    }
}

class MainStackNavigator extends React.Component {
    state = {
        loggedIn: false
    };

    // refreshes login state, updating screen being displayed.
    refreshLoginState = () => {
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
            <Stack.Navigator initialRouteName={this.state.initialRouteName}>
                {this.state.loggedIn ? (
                    /* Screens for logged in users */
                    <>
                        <Stack.Screen
                            name="Pods"
                            component={HomeScreen}
                            options={{
                                headerRight: () =>
                                    <TouchableOpacity onPress={this.logout} style={{marginRight: 16}}>
                                        <Text>Log Out</Text>
                                    </TouchableOpacity>,
                                animationEnabled: false
                            }}
                        />
                        <Stack.Screen name="Trainee Pod" component={TraineePodScreen} />
                        <Stack.Screen name="Associate Pod" component={AssociatePodScreen} />
                        <Stack.Screen name="Partner Pod" component={PartnerPodScreen} />
                        <Stack.Screen name="Random Screen" component={RandomScreen} />
                        <Stack.Screen name="Outcomes" component={OutcomesScreen} />
                    </>
                ) : (
                    /* Screens for signed out users */
                    <Stack.Screen
                        name="Login Screen"
                        component={componentWithRefreshFunc(LoginScreen, this.refreshLoginState)}
                        options={{
                            animationEnabled: false,
                        }}
                    />
                )}
            </Stack.Navigator>
        );
    }
}

function RandomScreen() {
    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    When the competencies screen, career pathway screen, and life
                    essential screens get set up, replace this screen with them.
                </Text>
            </View>
        </ScrollView>
    );
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

// export default MainStackNavigator;