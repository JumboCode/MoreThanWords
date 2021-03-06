import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, LogBox, Text, View } from 'react-native';
import Outcome from './Outcome';
import Constants from 'expo-constants';
import { getAccessToken } from '../../utils/auth.js'

export default function FocusGoals(props, { navigation, route }) {
    return (
        <Text>Hello, World!</Text>
    );
}