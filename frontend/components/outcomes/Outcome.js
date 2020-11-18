/*
 * Outcome.js
 *
 * Summary: Represents a single outcome for the user to keep track of their
 *          progress. Groups similar tasks together under a common name.
 * 
 * Representation:
 *     1) Title of the outcome group.
 *     2) Progress bar indicating the number of tasks completed/left to
 *        complete (may or may not be in final version).
 *     3) A list of Tasks corresponding to the goals of the outcome group.
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Accordion, Icon } from 'native-base';
import Task from './Task';

const styles = StyleSheet.create({
    accordion: {
        borderRadius: 2,
        shadowColor: "rgba(242, 242, 242, 1)",
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 3,
        margin: 10
    },
    headerStyle: {
        flexDirection: "row",
        backgroundColor: "rgba(242, 242, 242, 0.5)",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10
    },
    contentStyle: {
        flexDirection: "column",
        paddingLeft: 15,
        paddingRight: 5,
        backgroundColor: "rgba(242, 242, 242, 0.5)"
    },
});

const Outcome = (props) => {
    const defaultData = [ 
        {
            title: "Gather Essential Documents",
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
    ];

    return (
        <Accordion
            style={styles.accordion}
            expanded={0}
            dataArray={props.data ? props.data : defaultData}
            headerStyle={styles.headerStyle}
            renderContent={(taskListObject) => {
                const itemComponents = taskListObject.content.map(
                    (taskObj) =>
                    <Task
                        name={taskObj.key}
                        starIsFilled={taskObj.starIsFilled}
                        checked={taskObj.checked}
                    />
                );
                return (
                    <View
                        style={styles.contentStyle}> 
                        {itemComponents}
                    </View>
                );
            }}
        />
    );
};

export default Outcome;