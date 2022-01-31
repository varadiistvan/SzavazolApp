import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { TextInpu, ScrollView, SafeAreaView, FlatList } from 'react-native'
import { View, Text, StyleSheet, Button, Input } from 'react-native';

import BottomBar from './BottomBar';
import Collapsible from 'react-native-collapsible';
import { Pressable } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { Linking } from 'react-native';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import { Icon } from 'react-native-elements/dist/icons/Icon';



export default class Egyéni extends React.Component {
    constructor(props) {
        super(props)
        const items = [
            {}, 
            {bezárva: true, kerület: "Első választókerület", jelöltek: [{név: "Nem én", párt: "Megnevezetlen", program: "https://youtu.be/dQw4w9WgXcQ", kép: "https://images.generated.photos/yFlu_WXEFyf87Ey6gxfVy8NQD8FU_2AHGbOA8veybC8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTIzMzc1LmpwZw.jpg",}, {név: "II. Középkorú Férfi", párt: "Valamilyen párt", program: "https://docs.google.com/spreadsheets/d/1hYADXFrF3q7CYWM-GBcjtbu-0t77LQjdjJhLgZ4Kcic/edit#gid=0", kép: "https://images.generated.photos/_k77KivK50aLxS7YBmh8nvBWBRIL76Nay_W_g9XqxsM/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzM5NTYyLmpwZw.jpg"}]},
            {bezárva: true, kerület: "Második választókerület", jelöltek: [{név: "Mittudom Én", párt: "Az Akármelyik Párt", program: "http://www.ejg.hu/wp-content/uploads/HR2020.pdf", kép: "https://images.generated.photos/B2GHDnQ9Sksith7Jj5pqMskRWRP8PVGN5hMtK1oM3MQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTg0MDk2LmpwZw.jpg"}]}
        ]
        // for(var i = 2; i < 100; i++){
        //     items.push({bezárva: true, kerület: "Második választókerület", jelöltek: [{név: "Mittudom Én", párt: "Az Akármelyik Párt", program: "http://www.ejg.hu/oktatas/hazirend/", kép: "https://images.generated.photos/B2GHDnQ9Sksith7Jj5pqMskRWRP8PVGN5hMtK1oM3MQ/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTg0MDk2LmpwZw.jpg"}]})
        // }
        this.state = {items: items, currentSelection: 0}
    }
    render(){
        return(
            <SafeAreaView style={{height: '100%', backgroundColor: '#FF0210'}}>
                <FlatList
                contentContainerStyle={{
                    width: '100%',
                }}
                data = {this.state.items}
                renderItem = {({ item, index }) => {
                    if(index == 0) {
                        return(<SearchBar style={{borderColor: 'gray', borderWidth: 1,}} placeholder='todo' />)
                    }
                    else {
                        return(
                            <View style={{marginHorizontal: 10, marginBottom: 5}} >
                                <Pressable style={{backgroundColor: 'white', elevation: item.bezárva? 0: 10}} onPress={() => {
                                    var items = this.state.items
                                    items[index].bezárva = !items[index].bezárva
                                    if(this.state.currentSelection != null){
                                        items[this.state.currentSelection].bezárva = true
                                    }
                                    this.setState({items: items, currentSelection: items[index].bezárva? null: index}) 
                                }}>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
                                        <Text style={{margin: 10, color: '#FF0210', fontFamily: 'Poppins_700Bold'}}>{item.kerület}</Text>
                                        <Icon name={item.bezárva? 'add': 'remove'} color="#FF0210" size={28} />
                                    </View>
                                    
                                </Pressable>
                                <Collapsible collapsed={item.bezárva} title={item.kerület} >
                                    <View style={{backgroundColor: 'white'}}>
                                        {item.jelöltek.map((jelölt, index) => {
                                            return(
                                                <View key={index} style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <Image style={{width: '40%', aspectRatio:0.5, resizeMode: 'center'}} source={{uri: jelölt.kép}} />
                                                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'baseline', marginBottom: '5%', width:'50%'}}>
                                                        <Text style={{fontFamily:'Poppins_700Bold'}}>{jelölt.név}</Text>
                                                        <Text onPress={() => {this.props.navigation.navigate("Program",)}} >{jelölt.párt}</Text>
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
                    }
                }}
                keyExtractor={(item, index)=> index.toString()}
                >

                </FlatList>

                {/* <BottomBar navigation={this.props.navigation} color='#FF0210' /> */}

            </SafeAreaView>
        )
    }
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