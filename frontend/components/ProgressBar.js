import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const ProgressBar = (props) => {
  let animation = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: props.progress,
      useNativeDriver: false,
      duration: 1
    }).start();
  },[props.progress])

  const width = animation.current.interpolate({
    inputRange: [0, props.total_outcomes],
    outputRange: ["0%", "98%"], // getting rid of the weird border
    extrapolate: "clamp"
  })

  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.progressBar}>
        <Animated.View style={{backgroundColor: '#27B48F', width, borderRadius: 10, margin: 2}}/>
      </View>
      <Text style = {styles.ProgressBarText}>
        {`${props.progress} of ${props.total_outcomes} outcomes achieved`}
      </Text>
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  ongoing_ProgressBar: {
    flexDirection: 'row',
    height: 20,
    width: 250,
    backgroundColor: '#27b48f',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10
  },
  ongoing_ProgressBarText: {
    color: '#FFFFFF'
},

// complete
  ProgressBar: {
    flexDirection: 'row',
    height: 20,
    width: 250,
    backgroundColor: 'white',
    // backgroundColor: '#27b48f',
    borderColor: '#27b48f',
    // borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10
  },
  ProgressBarText: {
    color: '#3F3F3F'
    // color: '#FFFFFF'
},
});
