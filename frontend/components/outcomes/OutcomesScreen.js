import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
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

const titles = ["Example 1", "Example 2"];

let data = titles.map((title) => {
    return {
        title: title,
        content: [
            {
                key: "Complete Career Exploration Module",
                starIsFilled: true,
                checked: true
            },
            {
                key: "Attend at least one Site Visit / Info Session",
                starIsFilled: false,
                checked: true
            },
            {
                key: "Identify a Post MTW Plan",
                starIsFilled: false,
                checked: true
            },
        ]
    }
});

export default function OutcomesScreen({ navigation }) {

    const [dataTemp, setDataTemp] = useState(data);

    useEffect(() => {
            async function fetchData() {
                let dataFromBackend;
                // call endpoint
                // await fetch(`${Constants.manifest.extra.apiUrl}/youthCheckbox`)
                await fetch(`${Constants.manifest.extra.apiUrl}/youthCheckbox`)
                    .then(response => response.json())
                    .then(data => {
                        // if not verified tell them
                        console.log(data);
                        dataFromBackend = data;
                        let dataFields = dataFromBackend.records[0];
                        let trDataFields = {};
                        for (const key in dataFields) {
                            console.log(key);
                            if (key.includes("TR") && !key.includes("Outcome")) {
                                trDataFields[key] = dataFields[key];
                            }
                        }
                        // update data
                        console.log("Hello");
                        console.log(trDataFields);

                        let counter = true;
                        // Once outcome titles are known, replace this
                        let newData = [{
                            title: "Example",
                            content: []
                        }];
                        for (const key in trDataFields) {
                            if (counter) {
                                // Must be a YDM attribute
                                newData[0].content.push({
                                    key: key,
                                    starIsFilled: trDataFields[key],
                                });
                            } else {
                                newData[0].content[newData[0].content.length - 1].checked = trDataFields[key];
                            }
                            counter = !counter;
                        }
                        console.log(newData);
                        setDataTemp(newData);
                    })
                    .catch((error) => {
                        console.log("An error occurred.");
                        console.log(error);
                    });
                // parse returned data
                
                // setDataTemp(dataFromBackend);
            }
            fetchData();
        }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text>
                Outcomes Home
            </Text> */}
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