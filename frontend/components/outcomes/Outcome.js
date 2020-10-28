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
import { StyleSheet, View, FlatList} from 'react-native';
import { Accordion, Container, Text, Content } from 'native-base';

import Task from './Task';

const Outcome = (props) => {
    const data = [ 
        {
            title: props.title,
            content: [
                {key: "Complete Career Exploration Module", starIsFilled: true, checked: true},
                {key: "Attend at least one Site Visit / Info Session", starIsFilled: false, checked: true},
                {key: "Identify a Post MTW Plan", starIsFilled: false, checked: true},
            ]
        }
    ];

    // const dataArray = [
    //     { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    //     { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    //     { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
    // ];

    return (
        // <View>
        //     <FlatList 
        //         data={[
        //             {key: "Complete Career Exploration Module", starIsFilled: true, checked: true},
        //             {key: "Attend at least one Site Visit / Info Session", starIsFilled: false, checked: true},
        //             {key: "Identify a Post MTW Plan", starIsFilled: false, checked: true},
        //         ]}
        //         renderItem={({item}) => <Task name={item.key} starIsFilled={item.starIsFilled} checked={item.checked}/>}
        //     />
            
        // </View>
        <Container>
            <Content padder>
                <Accordion
                    dataArray={data}
                    // expanded={0}

                    renderContent={(taskListObject) => {
                        const itemComponents = taskListObject.content.map((taskObj) => 
                            <Task name={taskObj.key} starIsFilled={taskObj.starIsFilled} checked={taskObj.checked}/>
                        );
                        return (
                            <Container> 
                                <Content padder>
                                    {itemComponents}
                                </Content>
                            </Container>
                        );
                    }}
                    />
            </Content>
        </Container>
    );
};

export default Outcome;