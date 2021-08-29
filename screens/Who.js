import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Pressable } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

import BottomBar from './BottomBar';
import { SafeAreaView } from 'react-native';


export default class Who extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render(){
        return(
            <SafeAreaView style={{flex: 1}}>
                <View style={{
                    flex: 1,
                    justifyContent: "space-evenly",
                    flexDirection: 'column',
                    alignItems: "center",
                    backgroundColor: '#FF0210',
                    height: '100%'                   
                }}>
                    <StatusBar hidden={true} />
                    <Pressable style={[styles.button] } onPress={() => {this.props.navigation.navigate("Egyéni")}}>
                                <Icon name="person" containerStyle={styles.icon} color='#FF0210' size={100}/>
                                <Text style={{ textAlign: 'center', color: '#FF0210', marginBottom: 10, width: '90%',fontFamily: 'Poppins_700Bold'}}>EGYÉNI VÁLASZTÓKERÜLETI JELÖLTEK</Text>
                    </Pressable>
                    <Pressable style={[styles.button, ]} onPress={() => {this.props.navigation.navigate("Országos")}}>
                                <Icon name="format-list-numbered" containerStyle={styles.icon} color='#FF0210' size={100}/>
                                <Text style={{textAlign: 'center', color: '#FF0210', marginBottom: 10, width: '90%',fontFamily: 'Poppins_700Bold'}}>ORSZÁGOS LISTÁK</Text>
                    </Pressable>
                    
                </View>
                <BottomBar navigation={this.props.navigation} color={'red'}/>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '90%',
        height: '40%',
        marginHorizontal: '5%',
        borderRadius: 30, 
    },

    icon: {
        flex: 1, 
        marginTop: 10,
    },
})