import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, LogBox, SafeAreaView, StyleSheet, Text } from 'react-native';
import { getAccessToken } from '../../utils/auth.js';
import Outcome from './Outcome';

export default function OutcomesScreen({ navigation, route }) {

    const [dataTemp, setDataTemp] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [validPods, setValidPods] = useState({});

    useEffect(() => {

        LogBox.ignoreLogs(['Animated: `useNativeDriver`']); // Ignore 'useNativeDriver' warning
        LogBox.ignoreLogs(['Warning: ']); // Ignore 'componentWillMount' warning
        LogBox.ignoreAllLogs(); //Ignore all log notifications

        const { pod, focus_area, title } = route.params;

        navigation.setOptions({
            headerTitle: title
        });

        async function fetchData() {
            // Call valid pods endpoint to gray out properly
            await fetch(`${Constants.manifest.extra.apiUrl}/getValidPods`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + await getAccessToken(),
                },
            })
            .then(response => response.json())
            .then(data => {
                setValidPods(data);
            })
            .catch((error) => {
                console.error(error);
            });

            // Call checkbox endpoint with specific pod as argument
            await fetch(`${Constants.manifest.extra.apiUrl}/youthCheckbox?pod=${pod}&focus_area=${focus_area}`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + await getAccessToken(),
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json())
            .then(data => {
                setDataTemp(data["response"]);
                setDataLoaded(true);
            })
            .catch((error) => {
                console.error(error);
                // Set dataTemp to false to display error message to user
                setDataTemp(false);
            });
        }
        fetchData();
    }, []);

    return (
        dataLoaded ?
            //If data has loaded, then render the OutcomeScreen normally
            <SafeAreaView style={styles.container}>
                {dataTemp ?
                    <FlatList 
                        style={styles.listStyle}
                        data={dataTemp}
                        renderItem={({ item }) => {
                            return (
                                <Outcome 
                                    data={[item]}
                                    validPods={validPods}
                                />
                            );
                        }}
                        keyExtractor={item => item.title}
                    />
                :
                    <SafeAreaView style={styles.error_parent}>
                        <Text style={styles.error_message}> 
                            There are no outcomes to display.{"\n"}Please contact your manager or More Than Words{"\n"}administrator if you think this is an error.
                        </Text>
                    </SafeAreaView>
                }
            </SafeAreaView>
        : 
            //If data hasn't loaded, then display loading circle
            <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    listStyle: {
        paddingTop: 0,
    },

    error_parent: {
        flex: 1,
        justifyContent: 'center',
    },
    
    error_message: {
        textAlign: 'center',
    }
});
