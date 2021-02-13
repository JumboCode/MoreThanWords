import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, LogBox } from 'react-native';
import Outcome from './Outcome';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listStyle: {
        paddingTop: 10
    }
});

export default function OutcomesScreen({ navigation, route }) {

    const [dataTemp, setDataTemp] = useState([]);

    useEffect(() => {

        LogBox.ignoreLogs(['Animated: `useNativeDriver`']); // Ignore 'useNativeDriver' warning
        LogBox.ignoreLogs(['Warning: ']); // Ignore 'componentWillMount' warning
        LogBox.ignoreAllLogs(); //Ignore all log notifications

        async function fetchData() {
            // call endpoint
            await fetch(`${Constants.manifest.extra.apiUrl}/youthCheckbox`)
                .then(response => response.json())
                .then(data => {
                    let newData = [];

                    // Extract all outcome titles for later use
                    const { focus_area } = route.params;
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
                                starIsFilled: true,
                                checked: data[key]["value"]
                            });
                        }
                    }

                    // Update all starIsFilled values based on YDM fields
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
                            // Update starIsFilled field in existing entry
                            newData[index].content[content_index].starIsFilled = data[key]["value"];
                        }
                    }
                    setDataTemp(newData);
                })
                .catch((error) => {
                    console.error("An error occurred.");
                    console.error(error);
                });
        }
        fetchData();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
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
        </SafeAreaView>
    );
}