import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

export default class PartnerPodScreen extends React.Component {
    constructor(props) {
        super(props);

        /* State variables initalized:
        *    - compet_outcomes: number of completed competency outcomes 
        *    - career_outcomes: number of completed career pathway outcomes
        *    - life_outcomes: number of completed life essential outcomes 
        *    - compet_total_outcomes: total number of competency outcomes
        *    - career_total_outcomes: total number of career outcomes
        *    - life_total_outcomes: total number of life outcomes
        */
        this.state = {
            compet_outcomes: 0, 
            career_outcomes: 0,
            life_outcomes: 0,
            compet_total_outcomes: 0,
            career_total_outcomes: 0,
            life_total_outcomes: 0,
        };
    }

    render(){
        return (
            <ScrollView style={styles.scrollView}>
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>
                    PARTNER POD
                </Text>
                
                <TouchableOpacity 
                    style={styles.block} 
                    onPress={() => {
                        const { pod } = this.props.route.params;
                        this.props.navigation.navigate('Outcomes', {
                            pod: pod,
                            focus_area: "COM",
                            title: "Competencies"
                        });
                    }}
                >
                    <Text style={styles.blockText}>
                        Competencies
                    </Text>
                    
                    <Text>Outcomes Achieved</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={styles.block} 
                    onPress={() => {
                        const { pod } = this.props.route.params;
                        this.props.navigation.navigate('Outcomes', {
                            pod: pod,
                            focus_area: "CAR",
                            title: "Career Pathway"
                        });
                    }}
                >
                    <Text style={styles.blockText}>
                        Career Pathway
                    </Text>
                    <Text>Outcomes Achieved</Text>
                </TouchableOpacity>
            
                <TouchableOpacity 
                    style={styles.block} 
                    onPress={() => {
                        const { pod } = this.props.route.params;
                        this.props.navigation.navigate('Outcomes', {
                            pod: pod,
                            focus_area: "LIF",
                            title: "Life Essentials / Support Network"
                        });
                    }}
                >
                    <Text style={styles.blockText}>
                        Life Essentials/ Support Network
                    </Text>
                    <Text>Outcomes Achieved</Text>
                </TouchableOpacity>
            </SafeAreaView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 30,
        marginTop: 20,
        fontWeight: 'bold',
    },
    block: {
        marginTop: 40,
        width: 300,
        height: 180,
        backgroundColor: '#fae484',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    blockText: {
        fontSize: 25,
        textAlign: 'center',
    },
    scrollView: {
        backgroundColor: 'white'
    }
});