import React, { useState } from 'react'
import { View, Text, StyleSheet, Button, FlatList, Pressable, ViewProps } from 'react-native';
import { Icon } from 'react-native-elements';

interface BottomBarProps extends ViewProps {
    color: string
    navigation: any
}

export const BottomBar = ({
    color,
    navigation,
    ...ViewProps
}: BottomBarProps) => {

    return (
        <View style={styles.bar}>
            <Icon name='help' size={30} color={color} onPress={() => {navigation.navigate('Why')}} />
            <Icon name='home' size={30} color={color} onPress={() => {navigation.navigate('Home')}}/>
            <Icon name='map' size={30} color={color} onPress = {() => {navigation.navigate('Where')}} />
        </View>
    )
}

const styles = StyleSheet.create({
    bar:{
        height:56,
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 'auto',
    },
    icons:{

    }
})