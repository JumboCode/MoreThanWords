import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';


import PodProgressBar from './PodProgressBar.js';

export default class FocusAreaBlock extends React.Component {    
    constructor(props) {
        super(props);
    }
    
    /* render
	 * Paramaters: none
	 * Returns: nothing
	 * Purpose: renders a touchable opacity component on the pod pages, 
     * including the progress bars with completed and total outcomes, that 
     * navigate to the outcomes screen when pressed 
	 */
    render() {
        const completed_outcomes = this.props.completed_outcomes;
        const total_outcomes = this.props.total_outcomes;
        const pod_name = this.props.name;

        return (     
            <TouchableOpacity 
                style={styles.block} 
                onPress={() => {
                    const { pod } = this.props.route.params;
                    this.props.navigation.navigate('Outcomes', {
                        pod: pod,
                        focus_area: this.props.pod,
                        title: pod_name,
                    });
                }}
            >
                <Text style={styles.blockTitle}>
                    {pod_name} 
                </Text>
                <PodProgressBar progress={completed_outcomes} total_tasks={total_outcomes} />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    block: {
        width: '100%',
        height: 180,
        backgroundColor: '#fcfcfc',
        marginTop: 40,
    },
    blockTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 30,
        marginRight: 50,
    },
});