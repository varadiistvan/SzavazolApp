import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInput, ScrollView, SafeAreaView, FlatList } from 'react-native'
import { View, Text, StyleSheet, Button } from 'react-native';

import { BottomBar } from '../BottomBar';
import Collapsible from 'react-native-collapsible';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Linking } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

type Ember = {
    név: string
    párt: string
    program: string
    kép: string
}

type Kerület = {
    kerület: string
    jelöltek: Ember[]
}

interface EgyéniProps {
    navigation: any
}

export const Egyéni = ({
    navigation
}: EgyéniProps) => {

    const [items, setItems] = useState<Kerület[]>([]);
    const [currentSelection, setCurrentSelection] = useState<null | number>(null);

    useEffect(() => {
        const newItems: Kerület[] = [
            {kerület: "Első választókerület", jelöltek: [{név: "Nem én", párt: "Megnevezetlen", program: "https://youtu.be/dQw4w9WgXcQ", kép: "https://images.generated.photos/yFlu_WXEFyf87Ey6gxfVy8NQD8FU_2AHGbOA8veybC8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTIzMzc1LmpwZw.jpg",}, {név: "II. Középkorú Férfi", párt: "Valamilyen párt", program: "https://docs.google.com/spreadsheets/d/1hYADXFrF3q7CYWM-GBcjtbu-0t77LQjdjJhLgZ4Kcic/edit#gid=0", kép: "https://images.generated.photos/_k77KivK50aLxS7YBmh8nvBWBRIL76Nay_W_g9XqxsM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzM5NTYyLmpwZw.jpg"}]},
            {kerület: "Második választókerület", jelöltek: [{név: "Mittudom Én", párt: "Az Akármelyik Párt", program: "http://www.ejg.hu/wp-content/uploads/HR2020.pdf", kép: "https://images.generated.photos/B2GHDnQ9Sksith7Jj5pqMskRWRP8PVGN5hMtK1oM3MQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTg0MDk2LmpwZw.jpg"}]}
        ]
        for(let i = 2; i < 100; i++){
            newItems.push({kerület: "Második választókerület", jelöltek: [{név: "Mittudom Én", párt: "Az Akármelyik Párt", program: "http://www.ejg.hu/oktatas/hazirend/", kép: "https://images.generated.photos/B2GHDnQ9Sksith7Jj5pqMskRWRP8PVGN5hMtK1oM3MQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTg0MDk2LmpwZw.jpg"}]})
        }
    
        setItems(newItems)
    }, [])

    return(
        <SafeAreaView style={{height: '100%', backgroundColor: '#FF0210'}}>
            <FlatList
            contentContainerStyle={{
                width: '100%',
            }}
            data = {items}
            ListHeaderComponent={() => <Text>SearchBar</Text>}
            renderItem = {({ item, index }) => {
                return(
                    <View style={{marginHorizontal: 10, marginTop: 5}} >
                        <Pressable style={{backgroundColor: 'white', elevation: index != currentSelection? 0: 10}} onPress={() => {
                            setCurrentSelection(lastValue => index == lastValue? null: index)
                        }}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                                <Text style={{margin: 10, color: '#FF0210', fontFamily: 'Poppins_700Bold'}}>{item.kerület}</Text>
                                <Icon name={index != currentSelection? 'add': 'remove'} color="#FF0210" size={28} />
                            </View>
                            
                        </Pressable>
                        <Collapsible collapsed={index != currentSelection}>
                            <View style={{backgroundColor: 'white'}}>
                                {item.jelöltek.map((jelölt, index) => {
                                    return(
                                        <View key={index} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <Image style={{width: '40%', aspectRatio:0.5, resizeMode: 'center'}} source={{uri: jelölt.kép}} />
                                            <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'baseline', marginBottom: '5%', width:'50%'}}>
                                                <Text style={{fontFamily:'Poppins_700Bold'}}>{jelölt.név}</Text>
                                                <Text onPress={() => {navigation.navigate("Program",)}} >{jelölt.párt}</Text>
                                                <Text style={{textDecorationStyle: 'solid', textDecorationLine: 'underline'}} onPress={() => {
                                                    Linking.openURL(jelölt.program)
                                                }}>Program</Text>
                                            </View>
                                        </View>
                                    )
                                })}
                            </View>
                        </Collapsible>
                    </View>
                    
                )
            }}
            keyExtractor={(item, index)=> index.toString()}
            >

            </FlatList>

            {/* <BottomBar navigation={this.props.navigation} color='#FF0210' /> */}

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    grid: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        marginHorizontal: '5%',
        borderWidth: 1,
        borderColor: 'red'
    },

    item: {
        height: 200,
        borderWidth: 1,
        borderColor: 'red',

    }

})