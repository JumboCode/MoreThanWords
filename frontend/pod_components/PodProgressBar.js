import { Container, Content, ProgressBar } from 'native-base';
import React from 'react';
import { Component, StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';


export default function PodProgressBar() {
        return (
            <Container>
                <Content>
                    <ProgressBar progress={10} />
                    <ProgressBar progress={30} />
                </Content>
            </Container>
        );
}