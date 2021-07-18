import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { getUserInfo, removeToken } from '../utils/auth';
import { componentWithRefreshFunc } from '../utils/refresh';
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

function Screen({ refresh }) {
    const [ username, setUsername ] = React.useState("User");
    React.useEffect(() => {
        getUserInfo().then(info => setUsername(info.name));
    })


    const logOut = () => {
        removeToken().then(refresh);
    };
    return <ScrollView style={styles.container}>
      <View style={styles.listItem}>
          <Text style={styles.largeHeader}>Welcome, {username}</Text>
      </View>
      <TouchableOpacity onPress={logOut}>
          <View style={styles.listItem}>
              <Text style={styles.text}>Log Out</Text>
          </View>
      </TouchableOpacity>
    </ScrollView>
}


export default function SettingsTab({ refresh }) {
  return <Stack.Navigator>
          <Stack.Screen
              name="Settings"
              component={componentWithRefreshFunc(Screen, refresh)}
          />
        </Stack.Navigator>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        fontSize: 20
    },
    text: {
        fontSize: 15
    },
    largeHeader: {
      fontSize: 24,
      fontWeight: "bold",
      paddingVertical: 20
    },
    listItem: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderBottomColor: "#d8d8dc",
        borderBottomWidth: 1,
        backgroundColor: "white"
    }
})
