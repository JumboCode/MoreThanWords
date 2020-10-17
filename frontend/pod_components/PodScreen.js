import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

export default function PodScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                ASSOCIATE POD
            </Text>
            
            <TouchableOpacity style={styles.block}>
                <Text style={styles.blockText}>
                    Competencies
                </Text>
                
                <Text>Outcomes Achieved</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.block}>
                <Text style={styles.blockText}>
                    Career Pathway
                </Text>
                <Text>Outcomes Achieved</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.block}>
                <Text style={styles.blockText}>
                    Life Essentials/ Support Network
                </Text>
                <Text>Outcomes Achieved</Text>
            </TouchableOpacity>
                                    
            <StatusBar style="auto" />
        </View>
    );
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
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
        },
        blockText: {
                fontSize: 25,
                textAlign: 'center',
        },
});

//questions: style and indenting? sizing? style of buttons when pressed?
//<Text>{data}</Text>
//need help on states
//the code for each pod component is so similar. is there a way to make it more modular? 
//how can i do navigation if i don't have homescreen yet
