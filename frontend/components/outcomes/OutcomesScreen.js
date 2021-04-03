import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, LogBox, SafeAreaView, StyleSheet, Text } from 'react-native';
import { getAccessToken } from '../../utils/auth.js';
import Outcome from './Outcome';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listStyle: {
        paddingTop: 10
    },
    error_parent: {
        flex: 1,
        justifyContent: 'center',
    },
    error_message: {
        textAlign: 'center',
    }
});

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
            await fetch(`${Constants.manifest.extra.apiUrl}/getValidPods`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + await getAccessToken(),
                },
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                setValidPods(data);
            })
            .catch((error) => {
                console.error(error);
            });
            // Call checkbox endpoint with specific pod as argument
            await fetch(`${Constants.manifest.extra.apiUrl}/youthCheckbox?pod=${pod}`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + await getAccessToken(),
                },
            })
                .then(response => response.json())
                .then(data => {
                    let newData = [];

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

                    // Extract all outcome titles for later use
                    for (const api_name in data) {
                        if (api_name.includes("Outcome") && api_name.includes(focus_area) && !api_name.includes("Outcomes")) {
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
                        if (key.includes("Youth") && !key.includes("BOOL") && index >= 0) {
                            let words_in_key = key.split("_");
                            newData[index].content.push({
                                api_key: key,
                                api_bool_key: "",
                                id: words_in_key[words_in_key.length - 3].toLowerCase(),
                                key: data[key]["name"],
                                ydmApproved: true,
                                checked: data[key]["value"],
                                starIsFilled: false, // Change later based on salesforce data
                                pod: pod
                            });
                        }
                    }

                    // Update all ydmApproved values based on YDM fields
                    for (const key in data) {
                        // let key_id = key.substring(0, 3);
                        // let index = newData.findIndex(x => x.id === key_id);
                        // if (key.includes("YDM") && index >= 0) {
                        //     // Get ID of the current key so we can match with existing entry
                        //     let words_in_key = key.split("_");
                        //     let curr_id = words_in_key[words_in_key.length - 3].toLowerCase();
                        //     // Finds index of object in content array to update
                        //     let content_index = newData[index].content.findIndex(x => {
                        //         return x.id === curr_id;
                        //     });
                        //     // If the corresponding youth exists for the YDM field, update the value
                        //     if (content_index >= 0) {
                        //         // Update ydmApproved field in existing entry
                        //         newData[index].content[content_index].ydmApproved = data[key]["value"];
                        //     }
                        // }
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

                    // Update the dataTemp variable with the newly parsed data
                    setDataTemp(newData);
                    // Update the dataLoaded variable so OutcomeScreen replaces loading circle
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