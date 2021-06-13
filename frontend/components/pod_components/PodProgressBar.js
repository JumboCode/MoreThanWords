import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const PodProgressBar = (props) => {
    // computes the length of the grey line
    const checked_progress_diff = Math.max(props.checked ? props.checked - props.progress : 0, 0);
    //Animates the progress bar
    let animation = useRef(new Animated.Value(0));
    let animation_checked = useRef(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: props.progress,
            duration: 900,       //progress bar animation speed
            useNativeDriver: false,
        }).start();
        Animated.timing(animation_checked.current, {
            toValue: checked_progress_diff,
            duration: 900,       //progress bar animation speed
            useNativeDriver: false,
        }).start();
    },[props.progress, props.checked])
    
    //Calculates how far the bar goes
    const width = animation.current.interpolate({
        inputRange: [0, props.total_outcomes],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })
    const width_checked = animation_checked.current.interpolate({
        inputRange: [0, props.total_outcomes],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })

    return (
        <View style={styles.container} >
            <Text style={[styles.progressCount, {color: props.pod_status == "no access" ? '#C4C4C4' : 'black'}]}>
                {`${props.progress} of ${props.total_outcomes}`}
            </Text>
      
            <View style={styles.progressBar}>
                <Animated.View style={{backgroundColor: '#27B48F', width }}/>
                <Animated.View style={{backgroundColor: 'grey', width: width_checked }}/>
            </View>
        </View>
    );
}

export default PodProgressBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    progressBar: {
        flexDirection: 'row',
        height: 6,
        width: '100%',
        backgroundColor: '#ffffff',

        shadowColor: "#b4b4b4",
        shadowOffset: { height: 2 },
        shadowRadius: 0.5,
        shadowOpacity: 0.4,
    },
    
    progressCount: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#3f3f3f",

        marginBottom: 10,
        marginLeft: '85%',
    },
});
