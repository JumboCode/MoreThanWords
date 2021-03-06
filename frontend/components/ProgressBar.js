import React, {useRef, useState, useEffect} from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants';

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
      <View style={styles.ProgressBar}>
        <Animated.View style={[StyleSheet.absoluteFill], {backgroundColor: '#27B48F', width, borderRadius: 10, margin: 2}}/>
      </View>
      <Text style = {styles.ProgressBarText}>
        {`${props.progress} of ${props.total_outcomes} outcomes achieved`}
      </Text>
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  ProgressBar: {
    flexDirection: 'row',
    height: 20,
    width: 250,
    backgroundColor: 'white',
    borderColor: '#27b48f',
    borderWidth: 2,
    borderRadius: 10
  },
  ProgressBarText: {
    color: '#3F3F3F',
},
});
