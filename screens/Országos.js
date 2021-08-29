import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

import BottomBar from './BottomBar';
import { SafeAreaView } from 'react-native';
import { FlatList } from 'react-native';
import { Pressable } from 'react-native';
import { Image } from 'react-native';

export default class Országos extends React.Component {
    constructor(props) {
        super(props)
        const items = [
            {key: 0, logó: require('./assets/Pártok/megnevezetlen.jpg'), név: 'Megnevezetlen'},
            {key: 1, logó: require('./assets/Pártok/megnevezetlen.jpg'), név: 'Más párt, csak ugyanaz a logó'}
        ]
        for(var i = 2; i < 10; i++) {
            items.push({key: i, logó: require('./assets/Pártok/megnevezetlen.jpg'), név: `Párt ${i+1}`})
        }
        this.state = {items: items}
    }
    render(){
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
                    data = {this.state.items}
                    renderItem = {({item}) => {
                        return(
                            <View style={{flex: 1, alignItems: 'center'}}>
                                <Pressable onPress={() => {this.props.navigation.navigate('Program', {név: item.név, logó: item.logó})}} style={{
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
                    keyExtractor = {item => item.key.toString()}
                    />
                </View>
                
                {/* <BottomBar navigation={this.props.navigation} color={'#FF0210'}/> */}
            </SafeAreaView>
        )
    }
}