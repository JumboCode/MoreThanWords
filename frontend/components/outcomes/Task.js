/*
 * Task.js
 *
 * Summary: Represents a single task for a user of the app to complete. Can be
 *          checked off by the user, but must be verified by a Salesforce
 *          client to be fully completed.
 * 
 * Representation:
 *     1) A checkbox for the user to check off the task.
 *     2) A star representing whether the task has been checked off on
 *        Salesforce.
 *     3) The name of the task.
 */

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
// import Icon from 'react-native-elements';
// import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        // padding: 10
    },
    star: {
        width: 15,
        height: 15,
        resizeMode: 'contain'
    },
    taskContainer: {
        flex: 1,
        flexDirection: 'row'
    }
});

const Task = (props) => {

    return (
        <View style={styles.taskContainer}>
            {/* <Icon name='rowing' /> */}
            <Image
                source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQjTtX5y2RyZUrhg3tVPcl7LFhGzdGbFoTXPw&usqp=CAU"}}
                style={styles.star}
            />
            <Text>{props.name}</Text>
            <TouchableOpacity
                style={styles.button}>
                <Image 
                    style={styles.star}
                    source={{uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADo6OgwMDA3NzcgICCWlpba2tpLS0thYWHHx8eSkpLU1NR1dXWZmZlmZmZCQkK6urpZWVknJyfY2Ni/v7+hoaEKCgqnp6eysrL29vbOzs5RUVF7e3s5OTni4uIXFxdvf3ETAAACl0lEQVR4nO3daW7bMBRFYcWWZdmV6nhQPHTy/ldZGEEKkGmqC5LFZYDzLeCFB5Zi+tdrGgAAAAAAAAAAgE9o2419u/Rq+7Hb/p+8afNUj81UvO/l7I6KnC9F+04rd9BfHNflAr+4Yz7wtVRgTS9gaFcm8Nnd8Q99icB6P8GHAp9ire/gm+x3cXAXzMr9j3p0B8xq8wIv7vMLrlmF7tMrVjmBe/fpJTkX8T4edtgPC69hf4gPtUkPvEWjSt4EM6zjW3L6qCkctLqVO2WWW/RD51vypOjb/lfBQ+aJvqXTv/XDC1vG417c9+BkP5Ln/Azm7AueMNc1OFn6/XtZ6UMaP6bp15qwcFHwhLkWwcmWyXMo9KFQRaEPhSoKfShUUehDoYpCHwpVFPpQqKLQh0IVhT4Uqij0oVBFoQ+FKgp9KFRR6EOhikIfClUU+lCootCHQhWFPhSqKPShUEWhD4UqCn0oVFHoQ6GKQh8KVRT6UKii0IdCFYU+FKoo9KFQRaEPhSoKfShUUehDoYpCHwpVFPpQqKLQh0IVhT4Uqij0oVBFoQ+FKgp9KFRR6EOhikIfClUU+lCootCHQhWFPhSqKPShUEWhD4WqNphTx5rVV+vgZOn7D8O98fXusHxOnrML5tS0hzTcCTwmz+mCORU9puFD+tQlD9qGg+rZB3wPD5a+tvrdTuc6lq2eyu10jtbuPt7FGvdyHzIKP8du9SmjsDnPz7e75wQ2F/fxBdeswuboPv+s9Cvbq2H+T5idMgvjDfLVSd8c/8dm/q8Y7fID4/t3XdL3xgfq/RSLfIIPtb6LBd7BN0N8E6zBsexvnRd3T+x+Kdr3ML278Rptsu6iH9t2Y98uvdp+7NJ/DwIAAAAAAAAAABj9BhY0MMUQ9lyNAAAAAElFTkSuQmCC"}}/>
            </TouchableOpacity>
        </View>
    );
};

export default Task;