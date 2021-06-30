import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

import BottomBar from './BottomBar';

export default class Who extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render(){
        return(
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <StatusBar hidden={true} />
                <Text> Who </Text>
                <BottomBar navigation={this.props.navigation} color={'red'}/>
            </View>
        )
    }
}