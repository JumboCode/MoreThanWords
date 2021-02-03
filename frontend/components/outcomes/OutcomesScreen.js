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

const titles = ["Choose a Pathway to Pursue After MTW", ""];

// let data = titles.map((title) => {
//     return {
//         title: title,
//         content: [
//             {
//                 key: "Complete Career Exploration Module",
//                 starIsFilled: true,
//                 checked: true
//             },
//             {
//                 key: "Attend at least one Site Visit / Info Session",
//                 starIsFilled: false,
//                 checked: true
//             },
//             {
//                 key: "Identify a Post MTW Plan",
//                 starIsFilled: false,
//                 checked: true
//             },
//         ]
//     }
// });

let data = [
    {
        title: "Set Initial Goals",
        content: [
            {
                key: "Complete the Question 0 Map",
                starIsFilled: false,
                checked: false
            },
            {
                key: "Set Initial Goals for Time at MTW",
                starIsFilled: true,
                checked: true
            },
        ]
    },
    {
        title: "Choose a Pathway to Pursue After MTW",
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
    },
    {
        title: "Dependability",
        content: [
            {
                key: "90% Attendance and Punctuality",
                starIsFilled: true,
                checked: true
            },
            {
                key: "Set up Deputy on phone or computer",
                starIsFilled: true,
                checked: false
            },
            {
                key: "Demonstrate Dependability",
                starIsFilled: false,
                checked: false
            },
        ]
    },
    {
        title: "Respect",
        content: [
            {
                key: "Earn Respect on shift at least twice",
                starIsFilled: false,
                checked: false
            },
            {
                key: "I have been consistently respectful",
                starIsFilled: true,
                checked: true
            },
            {
                key: "Demonstrate Respect to Others",
                starIsFilled: true,
                checked: true
            },
        ]
    }
];

export default function OutcomesScreen({ navigation }) {

    // const [dataTemp, setDataTemp] = useState(data);

    // useEffect(() => {
    //         async function fetchData() {
    //             let dataFromBackend;
    //             // call endpoint
    //             // await fetch(`${Constants.manifest.extra.apiUrl}/youthCheckbox`)
    //             await fetch(`${Constants.manifest.extra.apiUrl}/youthCheckbox`)
    //                 .then(response => response.json())
    //                 .then(data => {
    //                     // if not verified tell them
    //                     console.log(data);
    //                     dataFromBackend = data;
    //                     let dataFields = dataFromBackend.records[0];
    //                     let trDataFields = {};
    //                     for (const key in dataFields) {
    //                         console.log(key);
    //                         if (key.includes("TR") && !key.includes("Outcome")) {
    //                             trDataFields[key] = dataFields[key];
    //                         }
    //                     }
    //                     // update data
    //                     console.log("Hello");
    //                     console.log(trDataFields);

    //                     let counter = true;
    //                     // Once outcome titles are known, replace this
    //                     let newData = [{
    //                         title: "Example",
    //                         content: []
    //                     }];
    //                     for (const key in trDataFields) {
    //                         if (counter) {
    //                             // Must be a YDM attribute
    //                             newData[0].content.push({
    //                                 key: key,
    //                                 starIsFilled: trDataFields[key],
    //                             });
    //                         } else {
    //                             newData[0].content[newData[0].content.length - 1].checked = trDataFields[key];
    //                         }
    //                         counter = !counter;
    //                     }
    //                     console.log(newData);
    //                     setDataTemp(newData);
    //                 })
    //                 .catch((error) => {
    //                     console.log("An error occurred.");
    //                     console.log(error);
    //                 });
    //             // parse returned data
                
    //             // setDataTemp(dataFromBackend);
    //         }
    //         fetchData();
    //     }, []);

    return (
        <SafeAreaView style={styles.container}>
            {/* <Text>
                Outcomes Home
            </Text> */}
            <FlatList 
                style={styles.listStyle}
                data={data}
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