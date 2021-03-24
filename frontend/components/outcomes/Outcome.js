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

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, LogBox } from 'react-native';
import { Accordion } from 'native-base';
import Task from './Task';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
LogBox.ignoreLogs(['Animated: `useNativeDriver`']); // Ignore 'useNativeDriver' warning

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

    const [outcomeData, setOutcomeData] = useState(props.data);

    handleSetOutcomeData = (backendID, updatedCheckboxValue, updatedStarValue) => {
        // // console.log(outcomeData);
        // let dataTemp = outcomeData;
        // let index = outcomeData[0].content.findIndex(x => x.api_key === backendID);
        // dataTemp[0].content[index].checked = updatedCheckboxValue;
        // dataTemp[0].content[index].starIsFilled = updatedStarValue;
        // // console.log(dataTemp);
        // setOutcomeData(dataTemp);
    };

    useEffect(() => {
        console.log(props.data);
        setOutcomeData(props.data);
    }, [props.timesChanged]);

    console.log("Rerendered Outcome", props.data[0].title);
    console.log(props.data);
    return (
        <Accordion
            style={styles.accordion}
            useNativeDriver={true}
            expanded={0}
            dataArray={props.data}
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
                        backendBoolID={taskObj.api_bool_key}
                        handleSetOutcomeData={handleSetOutcomeData}
                        starIsFilled={taskObj.starIsFilled}
                        pod={taskObj.pod}
                        handleSetAllData={props.handleSetAllData}
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