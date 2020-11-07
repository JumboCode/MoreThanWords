import React, {useRef, useState, useEffect} from 'react';
import { Text, View, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const ProgressBar = () => {
  let animation = useRef(new Animated.Value(0));
  let progress = 8;
  let total_task = 16;

  useEffect(() => {
    Animated.timing(animation.current, {
      toValue: progress,
      duration: 1
    }).start();
  },[progress])

  const width = animation.current.interpolate({
    inputRange: [0, total_task],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  })

  // {backgroundColor: "#8BED4F", width }
  return (
    <View style={styles.container}>
      <Text>
        Loading…..
      </Text>
      <View style={styles.progressBar}>
        <Animated.View style={[StyleSheet.absoluteFill]}/>
      </View>
      <Text>
        {`${progress}/${total_task}`}
      </Text>

    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 5
  }
});
