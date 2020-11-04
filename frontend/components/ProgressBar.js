import {Container, Content, ProgressBar} from 'native-base';
import React, {Component} from 'react';

export default class PodProgressBar extends Component {
    render() {
        return (
            <Container>
                <Content>
                    <ProgressBar progress={10} />
                    <ProgressBar progress={30} />
                </Content>
            </Container>
        );
    }
}