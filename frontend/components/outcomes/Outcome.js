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

import { Icon, Accordion, Text, View } from 'native-base';
import React, { useState } from 'react';
import { LogBox, StyleSheet } from 'react-native';
import Task from './Task';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications
LogBox.ignoreLogs(['Animated: `useNativeDriver`']); // Ignore 'useNativeDriver' warning

const Outcome = (props) => {
    const [outcomeData, setOutcomeData] = useState(props.data);
    const [accessible, setAccessible] = useState(props.validPods[props.data[0].content[0].pod + "_POD_Map__c"].status === "allowed");
    
    function handleSetOutcomeData(backendID, updatedCheckboxValue, updatedStarValue) {
        let dataTemp = outcomeData;
        let index = outcomeData[0].content.findIndex(x => x.api_key === backendID);
        dataTemp[0].content[index].checked = updatedCheckboxValue;
        dataTemp[0].content[index].starIsFilled = updatedStarValue;
        setOutcomeData(dataTemp);
    }

    const _renderHeader = (item, expanded) => {
        return (
            <View style={{
                flexDirection: "row",
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 4,
                paddingRight: 4,
                
                justifyContent: "space-between",
                alignItems: "center" ,
                backgroundColor: "#fefefe",
            
                shadowColor: "#b4b4b4",
                shadowOffset: { height: 2 },
                shadowRadius: 0.5,
                shadowOpacity: 0.25,
            }}
                >
            <Text style={{ fontWeight: "600", fontSize: "20", maxWidth: 350, lineHeight: 30}}>
                {" "}{item.title}
            </Text>
              {expanded
                ? <Icon style={{ fontSize: 18 }} name="chevron-down" />
                : <Icon style={{ fontSize: 18 }} name="chevron-up" />}
            </View>
          );
    }

    return ( 
        <Accordion
            style={styles.accordion}
            useNativeDriver={true}
            expanded={0}
            dataArray={outcomeData}
            renderHeader={_renderHeader}
            // headerStyle={styles.headerStyle}
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
                        backendBoolID={taskObj.api_bool_key}
                        accessible={accessible}
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
        backgroundColor: "#fefefe",
        marginLeft: 10,
        marginRight: 10,
        marginTop: 32,
    },

    headerStyle: {
        flexDirection: "row",
        backgroundColor: "#ff0000",
        justifyContent: "space-between",
        alignItems: "center",
    },
    
    contentStyle: {
        flexDirection: "column",
        paddingTop: 4,
        paddingLeft: 12,
        paddingRight: 4,
        backgroundColor: "#fefefe",

        shadowColor: "#b4b4b4",
        shadowOffset: { height: 2 },
        shadowRadius: 0.5,
        shadowOpacity: 0.25,

        paddingBottom: 25,
    },
});

export default Outcome;