import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import Constants from 'expo-constants';
import PasswordResetPage from './components/PasswordResetPage';
import { Assets as StackAssets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function DummyHomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
              title="Go to Details"
              onPress={() => navigation.push('PasswordReset')}
            />
        </View>
    )
}

export default function App() {
    const [data, setData] = React.useState("default");
    fetch(Constants.manifest.extra.apiUrl).then(rawResult => rawResult.json()).then(jsonResult => {
        setData(jsonResult.data)
    });
    return (
      <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={DummyHomeScreen} />
          <Stack.Screen name="PasswordReset" component={PasswordResetPage} />
      </Stack.Navigator>
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

