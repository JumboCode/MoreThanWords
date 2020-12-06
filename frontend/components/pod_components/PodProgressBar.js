import React, {useRef, useState, useEffect} from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants';

const PodProgressBar = (props) => {
    let animation = useRef(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: props.progress,
            duration: 900,       //progress bar animation speed
            useNativeDriver: false,
        }).start();
    },[props.progress])

    const width = animation.current.interpolate({
        inputRange: [0, props.total_tasks],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })

    return (
        <View style={styles.container} >
            <Text style={styles.progressCount}>
                {`${props.progress} of ${props.total_tasks}`}
            </Text>
      
            <View style={styles.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: '#27B48F', width }}/>
            </View>
        </View>
    );
}

export default PodProgressBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // padding: 8,
    },
    progressBar: {
        flexDirection: 'row',
        height: 10,
        width: '100%',
        backgroundColor: 'white',
        shadowOffset: { height: 3 },
        shadowColor: 'lightgrey',
        shadowOpacity: 1.0,
    },
    progressCount: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: '85%',
    },
});
