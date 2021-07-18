import React from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';

import { isTokenValid, removeToken } from "./utils/auth";


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
        return this.state.loggedIn ? 
            <MainScreen refresh={this.refreshLoginState}/>
            :
            <LoginScreen refresh={this.refreshLoginState}/>;
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