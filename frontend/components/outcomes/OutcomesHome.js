/*
 * OutcomesHome.js
 *
 * Summary: Represents an entire Outcome home screen. Contains all of a user's
 *          outcomes for a given focus area within a larger pod.
 * 
 * Representation:
 *     1) A list of Outcomes representing all outcomes associated with the
 *        current focus area/pod.
 *     2) A title for the outcome group.
 *     3) Back button.
 *     4) Navigation icon.
 */

import React from 'react';
import { StyleSheet, Text, FlatList } from 'react-native';
import { Header, Content, Container, Button, Icon, Left, Right, Body, Title } from 
    'native-base';
import Outcome from './Outcome';

class OutcomesHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.getData(),
            styles: StyleSheet.create({
                headerStyle: {
                    alignItems: "center",
                    backgroundColor: "rgba(242, 242, 242, 0.5)",
                    shadowColor: "rgba(242, 242, 242, 1)",
                    shadowOffset: { width: 1, height: 2 },
                    shadowRadius: 3,
                },
                titleStyle: {
                    color: "#3F3F3F",
                    fontSize: 20,
                    fontWeight: "500",
                    flex: 1
                },
                backButtonStyle: {
                    color: "#3F3F3F"
                },
                listStyle: {
                    paddingTop: 10
                }
            })
        };
    }

    getData() {
        return this.props.titles.map((title) => {
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
    }

    render() {
        return (
            <Container>
                <Header style={this.state.styles.headerStyle}>
                    <Left>
                        <Button transparent>
                            <Icon
                                style={this.state.styles.backButtonStyle}
                                name="ios-arrow-back"
                            />
                        </Button>
                    </Left>
                    <Body style={{flex: 1}}>
                        {/* <Text style={this.state.styles.titleStyle}>
                            Career Pathway
                        </Text> */}
                        <Title>Career Pathway</Title>
                    </Body>
                    <Right style={{flex: 1}}>
                        <Text>
                            Ex
                        </Text>
                    </Right>
                </Header>

                <Content>
                    <FlatList 
                        style={this.state.styles.listStyle}
                        data={this.state.data}
                        renderItem={({ item }) => {
                            return (
                                <Outcome data={[item]}/>
                            );
                        }}
                        keyExtractor={item => item.title}
                    />
                </Content>
            </Container>
        );
    }
}

export default OutcomesHome;