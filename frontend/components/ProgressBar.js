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

  const GreyOut = (props.progress == 0);
  const IsCompleted = (props.progress == props.total_outcomes && props.total_outcomes != 0);
  var Progresstextstyle = (GreyOut ? styles.ProgressBarText : styles.ongoing_ProgressBarText)
  if(IsCompleted){
    Progresstextstyle =  styles.complete_ProgressBarText;
  }

  return (
    <View style={{alignItems: 'center'}}> 
    {props.progress != 0 && 
      <View style={styles.progressBar}>
        <Animated.View style={{backgroundColor: '#27B48F', width, borderRadius: 10, margin: 2}}/>
      </View>
      }
      <Text style = {Progresstextstyle}>
        {`${props.progress} of ${props.total_outcomes} outcomes achieved`}
      </Text>
    </View>
  );
}


export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    height: 20,
    width: 250,
    backgroundColor: 'white',
    borderColor: '#27b48f',
    borderWidth: 2,
    borderRadius: 10
  },
  ongoing_ProgressBarText: {
    color: '#FFFFFF'
  },
  ProgressBarText: {
    color: '#C4C4C4'
  },
  complete_ProgressBarText: {
    color: '#27b48f'
  },
});
