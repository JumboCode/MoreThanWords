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
import { StyleSheet, Text, View, FlatList} from 'react-native';
// import { Accordion } from 'dooboo-ui';
import Task from './Task';

const Outcome = (props) => {
    const data = [
        {
            title: props.title,
            bodies: [
                {key: "Complete Career Exploration Module", starIsFilled: true, checked: true},
                {key: "Attend at least one Site Visit / Info Session", starIsFilled: false, checked: true},
                {key: "Identify a Post MTW Plan", starIsFilled: false, checked: true},
            ]
        }
    ];

    return (
        <View>
            <FlatList 
                data={[
                    {key: "Complete Career Exploration Module", starIsFilled: true, checked: true},
                    {key: "Attend at least one Site Visit / Info Session", starIsFilled: false, checked: true},
                    {key: "Identify a Post MTW Plan", starIsFilled: false, checked: true},
                ]}
                renderItem={({item}) => <Task name={item.key} starIsFilled={item.starIsFilled} checked={item.checked}/>}
            />
            {/* <Accordion
                data={data}
                shouldAnimate={true}
                collapseOnStart={true}
                animDuration={300}
                activeOpacity={1}
                renderTitle={(item) => <Text>{item.title}</Text>}
                renderBody={(item) => <Text>Hello</Text>}
                // toggleElement={<ArrowDown />}
                >
                
            </Accordion> */}
        </View>
    );
};

export default Outcome;