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

import { Accordion } from 'native-base';
import React, { useState } from 'react';
import { LogBox, StyleSheet, View } from 'react-native';
import Task from './Task';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
LogBox.ignoreLogs(['Animated: `useNativeDriver`']); // Ignore 'useNativeDriver' warning

const Outcome = (props) => {

    const [outcomeData, setOutcomeData] = useState(props.data);

    handleSetOutcomeData = (backendID, updatedCheckboxValue, updatedStarValue) => {
        let dataTemp = outcomeData;
        let index = outcomeData[0].content.findIndex(x => x.api_key === backendID);
        dataTemp[0].content[index].checked = updatedCheckboxValue;
        dataTemp[0].content[index].starIsFilled = updatedStarValue;
        setOutcomeData(dataTemp);
    };

    return (
        <Accordion
            style={styles.accordion}
            useNativeDriver={true}
            expanded={0}
            dataArray={outcomeData}
            headerStyle={styles.headerStyle}
            renderContent={(taskListObject) => {
                const itemComponents = taskListObject.content.map(
                    (taskObj) =>
                    <Task
                        key={taskObj.key}
                        name={taskObj.key}
                        ydmApproved={taskObj.ydmApproved}
                        checked={taskObj.checked}
                        backendID={taskObj.api_key}
                        handleSetOutcomeData={handleSetOutcomeData}
                        starIsFilled={taskObj.starIsFilled}
                        pod={taskObj.pod}
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


const styles = StyleSheet.create({
    accordion: {
        backgroundColor: "#fcfcfc",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 32,
    },

    headerStyle: {
        flexDirection: "row",
        backgroundColor: "#fcfcfc",
        justifyContent: "space-between",
        alignItems: "center",

    },
    
    contentStyle: {
        flexDirection: "column",
        paddingLeft: 15,
        paddingRight: 5,
        backgroundColor: "#fcfcfc",

        shadowColor: "#b4b4b4",
        shadowOffset: { height: 2 },
        shadowRadius: 0.5,
        shadowOpacity: 0.4,
    },
});

export default Outcome;