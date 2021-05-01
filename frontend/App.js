import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import LoginScreen from './components/LoginPage.js';
import OutcomesScreen from './components/outcomes/OutcomesScreen.js';
import HomeScreen from './components/pod_components/HomeScreen.js';
import PodScreen from './components/pod_components/PodScreen.js';
import { isTokenValid, removeToken } from "./utils/auth";
import { Image } from 'react-native';



const Stack = createStackNavigator();

/* Higher order function that returns the component binded with refresh_func */
function componentWithRefreshFunc(Component, refresh_func) {
    return function ({...rest}) {
        return <Component refresh={refresh_func} {...rest}/>
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
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName={this.state.initialRouteName}
                >
                    {this.state.loggedIn ? (
                        /* Screens for logged in users */
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
                    ) : (
                        /* Screens for signed out users */
                        <Stack.Screen
                            name="Login Screen"
                            component={componentWithRefreshFunc(LoginScreen, this.refreshLoginState)}
                            options={{
                                headerShown: false,
                                animationEnabled: false
                            }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
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

export default MainStackNavigator;