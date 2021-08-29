import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

import BottomBar from './BottomBar';
import { SafeAreaView } from 'react-native';

export default class Program extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render(){
        return(
            <SafeAreaView style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <StatusBar hidden={true} />
                <Text> Program </Text>
                {/* <BottomBar navigation={this.props.navigation} color={'orange'}/> */}
            </SafeAreaView>
        )
    }
}