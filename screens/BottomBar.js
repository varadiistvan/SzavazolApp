import React from 'react'
import { View, Text, StyleSheet, Button, FlatList, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';

export default class BottomBar extends React.Component{
    constructor(props) {
        super(props)

    }
    render(){
        return(
            <View style={styles.bar}>
                <Icon name='help' size={30} color={this.props.color} onPress={() => {this.props.navigation.navigate('Why')}} />
                <Icon name='home' size={30} color={this.props.color} onPress={() => {this.props.navigation.navigate('Home')}}/>
                <Icon name='map' size={30} color={this.props.color} onPress = {() => {this.props.navigation.navigate('Where')}} />
            </View>
        )
    }
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