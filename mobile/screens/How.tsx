import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

import { BottomBar } from './BottomBar';

interface HowProps {
    navigation: any
}

export const How = ({
    navigation
}: HowProps) => {

    
    return(
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <StatusBar hidden={true} />
            <Text> How </Text>
            {/* <BottomBar navigation={this.props.navigation} color={'#BA3692'}/> */}
        </View>
    )
}