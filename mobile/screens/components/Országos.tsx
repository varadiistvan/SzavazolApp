import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button, ImageProps } from 'react-native';

import { BottomBar } from '../BottomBar';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native';
import { Pressable } from 'react-native';
import { Image } from 'react-native';

type Item = {
    logó: ImageProps["source"]
    név: string
}

interface OrszágosProps {
    navigation: any
}

export const Országos = ({
    navigation
}: OrszágosProps) => {

    const newItems: Item[] = [
        {logó: require('../assets/Pártok/megnevezetlen.jpg'), név: 'Megnevezetlen'},
        {logó: require('../assets/Pártok/megnevezetlen.jpg'), név: 'Más párt, csak ugyanaz a logó'}
    ]
    for(let i = 2; i < 10; i++) {
        newItems.push({logó: require('../assets/Pártok/megnevezetlen.jpg'), név: `Párt ${i+1}`})
    }
    
    
    const [items, setItems] = useState<Item[]>(newItems);


    return(
        <SafeAreaView style={{
            width: '100%',
            backgroundColor: '#FF0210',
            flex: 1
        }}>
            <View style={{flex: 1}}>
                <FlatList 
                contentContainerStyle = {{
                    width: '100%',
                    paddingTop: 20
                }}
                data = {items}
                renderItem = {({item}) => {
                    return(
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Pressable onPress={() => {navigation.navigate('Program', {név: item.név, logó: item.logó})}} style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                width: '90%',
                                borderWidth: 1,
                                borderColor: 'gray',
                                marginBottom: 15,
                                borderRadius: 20,
                                backgroundColor: 'white'
                            }}>
                                <Image style={{width: '40%', resizeMode: 'center'}} source={item.logó} />
                                <Text style={{width: '40%', fontFamily: 'Poppins_700Bold', textAlign: 'center', textAlignVertical: 'center'}}>{item.név}</Text>
                            </Pressable>
                        </View>
                    )
                }}
                keyExtractor = {item => item.név}
                />
            </View>
            
            {/* <BottomBar navigation={this.props.navigation} color={'#FF0210'}/> */}
        </SafeAreaView>
    )
}