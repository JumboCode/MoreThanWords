import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './components/pod_components/HomeScreen.js';
import TraineePodScreen from './components/pod_components/TraineePod.js';
import AssociatePodScreen from './components/pod_components/AssociatePod.js';
import PartnerPodScreen from './components/pod_components/PartnerPod.js';
import LoginScreen from './components/LoginPage.js';

import { getName, isTokenValid, removeToken } from "./utils/auth";

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
                <Stack.Navigator initialRouteName={this.state.initialRouteName}>
                    {this.state.loggedIn ? (
                        /* Screens for logged in users */
                        <>
                        <Stack.Screen 
                            name="Home" 
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
             </NavigationContainer>
         );
    }
}

function RandomScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
          When the competencies screen, career pathway screen, and life 
          essential screens get set up, replace this screen with them.
      </Text>
    </View>
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
});

export default MainStackNavigator;
