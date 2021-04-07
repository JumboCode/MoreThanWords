import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const PodProgressBar = (props) => {
    //Animates the progress bar
    let animation = useRef(new Animated.Value(0));
    useEffect(() => {
        Animated.timing(animation.current, {
            toValue: props.progress,
            duration: 900,       //progress bar animation speed
            useNativeDriver: false,
        }).start();
    },[props.progress])
    
    //Calculates how far the bar goes
    const width = animation.current.interpolate({
        inputRange: [0, props.total_outcomes],
        outputRange: ["0%", "100%"],
        extrapolate: "clamp"
    })

    return (
        <View style={styles.container} >
            <Text style={styles.progressCount}>
                {`${props.progress} of ${props.total_outcomes}`}
            </Text>
      
            <View style={styles.progressBar}>
                <Animated.View style={{backgroundColor: '#27B48F', width }}/>
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
        marginBottom: 10,
        marginLeft: '85%',
    },
});
