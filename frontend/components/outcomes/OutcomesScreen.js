import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, FlatList } from 'react-native';
import Outcome from './Outcome';

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

const data = titles.map((title) => {
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