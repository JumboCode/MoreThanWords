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
import { StyleSheet, ScrollView } from 'react-native';
import { Accordion, Container, Text, Content, View, Header } from 'native-base';

import Task from './Task';

const styles = StyleSheet.create({
    accordion: {
        borderRadius: 2,
        // borderColor: "rgba(248, 248, 248, 1)",
        // borderBottomWidth: 2
        shadowColor: "rgba(248, 248, 248, 1)",
        shadowOffset: { width: 1, height: 2 },
        shadowRadius: 2,
    },
    headerStyle: {
        flex: 1,
        // width: "50%",
        backgroundColor: "rgba(248, 248, 248, 0.5)",
        fontSize: 20,
        fontWeight: "bold"
        // borderColor: "rgba(248, 248, 248, 0.5)"
        // borderWidth: 0
    },
    // contentStyle: {
    //     flex: 1,
    //     // height: "50%"
    //     backgroundColor: "#ECECEC"
    // },
    container: {
        flexDirection: "column"
    }
});

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
                {/* <ScrollView onContentSizeChange={(width, height) => { styles.headerStyle.width = `${width}%` }}>  */}
                    <Accordion
                        style={styles.accordion}
                        dataArray={data}
                        headerStyle={styles.headerStyle}
                        // animation={false}
                        // contentStyle={styles.contentStyle}
                        // contentStyle={{backgroundColor: "#ECECEC"}}
                        // expanded={0}
                        // renderHeader={(item, expanded) => {
                        //     return (
                        //         <Container>
                        //             <Text
                        //                 style={styles.headerStyle}>
                        //                 {item.title}
                        //             </Text>
                        //         </Container>
                        //     );
                        // }}
                        renderContent={(taskListObject) => {
                            const itemComponents = taskListObject.content.map((taskObj) => 
                                <Task name={taskObj.key} starIsFilled={taskObj.starIsFilled} checked={taskObj.checked}/>
                            );
                            return (
                                <Container
                                    style={{padding: 5,
                                            backgroundColor: "rgba(248, 248, 248, 0.5)"}}> 
                                    {/* <Content padder> */}
                                        {itemComponents}
                                    {/* </Content> */}
                                </Container>
                            );
                        }}
                    />
                {/* </ScrollView> */}
            </Content>
        </Container>
    );
};

export default Outcome;