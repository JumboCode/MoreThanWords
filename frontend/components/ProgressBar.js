import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const ProgressBar = (props) => {
  let animation = useRef(new Animated.Value(0));
  let animation_checked = useRef(new Animated.Value(0));
  useEffect(() => {
    let isMounted = true;
    Animated.timing(animation.current, {
      toValue: props.progress,
      useNativeDriver: false,
      duration: 900
    }).start();
    Animated.timing(animation_checked.current, {
      toValue: props.checked ?? props.progress,
      useNativeDriver: false,
      duration: 900
    }).start();
  },[props.progress, props.checked])

  const width = animation.current.interpolate({
    inputRange: [0, props.total_outcomes],
    outputRange: ["0%", "99.1%"], // getting rid of the weird border
    extrapolate: "clamp"
  });
  const checked_width = animation_checked.current.interpolate({
    inputRange: [0, props.total_outcomes],
    outputRange: ["0%", "99.1%"], // getting rid of the weird border
    extrapolate: "clamp"
  });

  const GreyOut = props.greyout;
  const IsCompleted = (props.progress == props.total_outcomes && props.total_outcomes != 0);
  var Progresstextstyle = (GreyOut ? styles.ProgressBarText : styles.ongoing_ProgressBarText)
  var Progressbarstyle = styles.ongoing_progressBar;
  if(IsCompleted){
    Progresstextstyle =  styles.complete_ProgressBarText;
    Progressbarstyle = styles.progressBar;
  }

  const bar_color = IsCompleted ? '#27B48F' : 'white';
  const checked_bar_color = IsCompleted ? 'grey' : '#cae6de';

  return (
    <View style={{alignItems: 'center'}}> 
    {!GreyOut && <>
      <View style={Progressbarstyle} key={1}>
        {!IsCompleted ? <Animated.View style={{ width: checked_width, backgroundColor: checked_bar_color, position: 'absolute', ...styles.barFill}}/> : null}
        <Animated.View style={{ width, backgroundColor: bar_color, position: 'absolute', ...styles.barFill}}/>
      </View>
      </>
      }
      <Text style = {Progresstextstyle}>
        {props.checked && !IsCompleted ? `${Math.round(props.checked/props.total_outcomes * 100)}% items checked\n` : ""}
        {`${props.progress} of ${props.total_outcomes} outcomes achieved`}
      </Text>
    </View>
  );
}


export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    flexDirection: 'row',
    height: 16,
    width: 320,
    backgroundColor: 'white',
    paddingLeft: 2, 
    paddingRight: 2, 
    borderColor: '#27b48f',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10
  },

  ongoing_progressBar: {
    flexDirection: 'row',
    height: 16,
    width: 320,
    paddingLeft: 2, 
    paddingRight: 2, 
    backgroundColor: '#27b48f',
    borderColor: '#ffffff',
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10
  },

  barFill: {
    position: 'absolute', 
    borderRadius: 10, 
    left: 1, 
    height: 8, 
    padding: 2, 
    margin: 2
  },

  ongoing_ProgressBarText: {
    color: '#FFFFFF',
    marginTop: 13,
    fontSize: 16.5,
    fontWeight: '500',
    letterSpacing: 0.75,
    textAlign: 'center'
  },

  ProgressBarText: {
    color: '#e5e5e5',
    marginTop: 13,
    fontSize: 16.5,
    fontWeight: '500',
    letterSpacing:  0.75,
    textAlign: 'center'
  },

  complete_ProgressBarText: {
    color: '#27b48f',
    marginTop: 13,
    fontSize: 16.5,
    fontWeight: '500',
    letterSpacing:  0.75
  },
});
