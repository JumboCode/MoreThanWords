import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { updateSalesforce } from '../../utils/tasks';

export default function StarredTask({ task, handleSetTasks }) {
  const { ydmApproved, api_key, api_bool_key, accessible, key, pod } = task;
  const [ clickable, setClickable ] = React.useState(true);
  const [ checked, setChecked ] = React.useState(false);
  const [ starIsFilled, setStarIsFilled ] = React.useState(false);

  React.useEffect(() => {
    const { checked, starIsFilled } = task;
    setChecked(checked);
    setStarIsFilled(starIsFilled);
  }, []);

  const textStyle = React.useMemo(() => ({
    flex: 1,
    textAlign: 'left',
    color: ydmApproved || !accessible ? "#C4C4C4" : "#3F3F3F",
  }), [ydmApproved, accessible]);

  return <View style={styles.taskContainer}>
      <Icon.Button
          style={styles.starContainer}
          name={starIsFilled ? "star" : "star-outline"}
          iconStyle={styles.star}
          color={!accessible || ydmApproved ? "#C4C4C4" : "#FF4646"}
          backgroundColor='transparent'
          underlayColor='transparent'
          size={20}
          onPress={!accessible || ydmApproved || !clickable ? null : () => {
              setClickable(false);
              let success = updateSalesforce(!starIsFilled, true, api_bool_key, api_key, pod);
              if (success) {
                  handleSetTasks(api_key, checked, !starIsFilled);
                  // Prevent user from clicking again until a second has passed
                  setStarIsFilled(!starIsFilled);
                  setTimeout(() => setClickable(true));
              } else {
                  setClickable(true);
              }
          }}
      />
      <View style={styles.viewWithBorder}>
        <Text style={textStyle}>
            {key}
        </Text>

        <Icon.Button
            style={styles.checkboxContainer}
            name={checked ? 'checkbox-outline' : 
                  'square-outline'}
            iconStyle={styles.checkbox}
            color={!accessible || ydmApproved ? "#C4C4C4" : "#3F3F3F"}
            backgroundColor='transparent'
            underlayColor='transparent'
            onPress={!accessible || ydmApproved || !clickable ? null : () => {
                setClickable(false);
                let success = updateSalesforce(!checked, false, api_bool_key, api_key, pod);
                if (success) {
                    handleSetTasks(api_key, !checked, starIsFilled);
                    // Prevent user from clicking again until a second has passed
                    setChecked(false); 
                    setTimeout(() => setClickable(true), 1000);
                } else {
                    setClickable(true);
                }
            }}
        />
      </View>
    </View>;
}

const styles = StyleSheet.create({
  starContainer: {
    paddingRight: 0,
    paddingLeft: 0,
  },

  star: {
    width: 30,
    margin: 0,
    marginRight: 0,
    marginLeft: 0,
  },

  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },

  viewWithBorder: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "#d8d8dc",
    paddingVertical: 5,
    alignItems: 'center',
  },

  checkbox: {
    margin: 0,
    marginRight: 0,
  },

  checkboxContainer: {
    paddingRight: 0,
  },

  greyText: {
      flex: 1,
      textAlign: 'left',
      color: '#C4C4C4',
  },
});