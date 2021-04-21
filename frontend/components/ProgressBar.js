import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const ProgressBar = (props) => {
  let animation = useRef(new Animated.Value(0));
  useEffect(() => {
    let isMounted = true;
    Animated.timing(animation.current, {
      toValue: props.progress,
      useNativeDriver: false,
      duration: 1
    }).start();
  },[props.progress])

  const width = animation.current.interpolate({
    inputRange: [0, props.total_outcomes],
    outputRange: ["0%", "98.5%"], // getting rid of the weird border
    extrapolate: "clamp"
  })

  const GreyOut = (props.progress == 0);
  const IsCompleted = (props.progress == props.total_outcomes && props.total_outcomes != 0);
  var Progresstextstyle = (GreyOut ? styles.ProgressBarText : styles.ongoing_ProgressBarText)
  var Progressbarstyle = styles.ongoing_progressBar;
  if(IsCompleted){
    Progresstextstyle =  styles.complete_ProgressBarText;
    Progressbarstyle = styles.progressBar;
  }

  return (
    <View style={{alignItems: 'center'}}> 
    {props.progress != 0 && 
      <View style={Progressbarstyle}>
        {IsCompleted && <Animated.View style={{backgroundColor: '#27B48F', width, borderRadius: 10, margin: 2}}/>}
        {!IsCompleted && <Animated.View style={{backgroundColor: 'white', width, borderRadius: 10, margin: 2}}/>}
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
    height: 18,
    width: 300,
    backgroundColor: 'white',
    paddingLeft: 2, 
    paddingRight: 2, 
    borderColor: '#27b48f',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 4
  },

  ongoing_progressBar: {
    flexDirection: 'row',
    height: 17,
    width: 305,
    paddingLeft: 2, 
    paddingRight: 2, 
    backgroundColor: '#27b48f',
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 4
  },

  ongoing_ProgressBarText: {
    color: '#FFFFFF',
    marginTop: 13,
    fontSize: 16.5,
    fontWeight: '500',
    letterSpacing: 0.75
  },

  ProgressBarText: {
    color: '#e5e5e5',
    marginTop: 13,
    fontSize: 16.5,
    fontWeight: '500',
    letterSpacing:  0.75
  },

  complete_ProgressBarText: {
    color: '#27b48f',
    marginTop: 13,
    fontSize: 16.5,
    fontWeight: '500',
    letterSpacing:  0.75
  },
});
