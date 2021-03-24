import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, LogBox, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js'
import Task from './Task';
import Outcome from './Outcome';

export default function FocusGoals(props, { navigation, route }) {

    const [focusGoalsDataState, setFocusGoalsDataState] = useState([]);

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

    useEffect(() => {
        console.log("Focus Goals useEffect")
        // console.log(props.allData)
        let focusGoalsData = [
            {
                title: "Unchecked",
                content: []
            },
            {
                title: "Checked",
                content: []
            }
        ];

        for (const apiName in props.allData) {
            let outcomeArray = props.allData[apiName];
            // console.log(data);
            for (const outcome of outcomeArray) {
                // console.log(key);
                let taskArray = outcome.content;
                // console.log(currTask);
                // console.log(currTask.starIsFilled);
                for (const task of taskArray) {
                    // console.log(task);
                    if (task.starIsFilled) {
                        // console.log(task.api_key);
                        if (task.checked) {
                            focusGoalsData[1].content.push(task);
                        } else {
                            focusGoalsData[0].content.push(task);
                        }
                    }
                }
            }
        }

        // console.log(focusGoalsData);
        if (focusGoalsData[0].content.length > 0 || focusGoalsData[1].content.length > 0) {
            setFocusGoalsDataState(focusGoalsData);
        } else {
            setFocusGoalsDataState(false);
        }
    }, [props.timesChanged]);
    
    // console.log(focusGoalsData);
    return (
        <SafeAreaView style={styles.container}>
            {focusGoalsDataState ?
                <FlatList 
                    style={styles.listStyle}
                    data={focusGoalsDataState}
                    renderItem={({ item }) => {
                        return (
                            <Outcome
                                data={[item]}
                                handleSetAllData={props.handleSetAllData}
                                timesChanged={props.timesChanged}
                            />
                        );
                    }}
                    keyExtractor={item => item.title}
                />
            :
                <SafeAreaView style={styles.error_parent}>
                    <Text style={styles.error_message}> 
                        Star a task to add a Focus Goal!
                    </Text>
                </SafeAreaView>
            }
        </SafeAreaView>
    );
}