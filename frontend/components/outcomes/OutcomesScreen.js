import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, LogBox, Text, View } from 'react-native';
import Outcome from './Outcome';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js'

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

    useEffect(() => {

        LogBox.ignoreLogs(['Animated: `useNativeDriver`']); // Ignore 'useNativeDriver' warning
        LogBox.ignoreLogs(['Warning: ']); // Ignore 'componentWillMount' warning
        LogBox.ignoreAllLogs(); //Ignore all log notifications

        const { pod, focus_area, title } = route.params;

        navigation.setOptions({
            headerTitle: title
        });

        async function fetchData() {
            // Call checkbox endpoint
            await fetch(`${Constants.manifest.extra.apiUrl}/youthCheckbox?pod=${pod}`, {
                method: 'GET',
                headers: {
                    'Authorization': "Bearer " + await getAccessToken(),
                    // 'Accept': 'application/json',
                    // 'Content-Type': 'application/json'
                },
                // body: JSON.stringify({
                //     pod: pod
                // })
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(pod);
                    let newData = [];
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
                        if (key.includes("Youth") && index >= 0) {
                            let words_in_key = key.split("_");
                            newData[index].content.push({
                                api_key: key,
                                id: words_in_key[words_in_key.length - 3].toLowerCase(),
                                key: data[key]["name"],
                                ydmApproved: true,
                                checked: data[key]["value"],
                                starIsFilled: true // Change later based on salesforce data
                            });
                        }
                    }

                    // Update all ydmApproved values based on YDM fields
                    for (const key in data) {
                        let key_id = key.substring(0, 3);
                        let index = newData.findIndex(x => x.id === key_id);
                        if (key.includes("YDM") && index >= 0) {
                            // Get ID of the current key so we can match with existing entry
                            let words_in_key = key.split("_");
                            let curr_id = words_in_key[words_in_key.length - 3].toLowerCase();
                            // Finds index of object in content array to update
                            let content_index = newData[index].content.findIndex(x => {
                                return x.id === curr_id;
                            });
                            // Update ydmApproved field in existing entry
                            newData[index].content[content_index].ydmApproved = data[key]["value"];
                        }
                    }
                    setDataTemp(newData);
                })
                .catch((error) => {
                    console.error(error);
                    setDataTemp(false);
                });
        }
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            {dataTemp ?
                <FlatList 
                    style={styles.listStyle}
                    data={dataTemp}
                    renderItem={({ item }) => {
                        return (
                            <Outcome data={[item]}/>
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
    );
}