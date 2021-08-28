import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';


import BottomBar from './BottomBar';

export default class Home extends React.Component {
    constructor(props) {
        super(props)
        const items = [{title: "KIRE SZAVAZHATOK?", background: "red", icon: 'people', key: "Who"},
            {title: "POLITIKAI IRÁNYTŰ", background: "orange", icon: 'explore', key: "Compass"},
            {title: "MIÉRT SZAVAZZAK?", background: "limegreen", icon: 'help', key: "Why"},
            {title: "HOL SZAVAZZAK?", background: "mediumturquoise", icon: 'map', key: "Where"},
            {title: "KVÍZ", background: "blue", icon: 'list', key: "Quiz"},
            {title: "HOGYAN SZAVAZHATOK", background: "mediumorchid", icon: 'info', key: "How"}]
        this.state = {items: items}
        
    }
    render(){
        return(
            <SafeAreaView style={{
                flex: 1,
                flexDirection: 'column',
                marginTop: StatusBar.currentHeight || 0,
                backgroundColor: '#FFD900',
              }}>
                <FlatList 
                    contentContainerStyle={styles.grid}
                    data={this.state.items}
                    renderItem={({ item }) => {
                        return(
                        <Pressable style={[styles.button, {backgroundColor: item.background, }]} onPress={() => {this.props.navigation.navigate(item.key)}}>
                            <Icon name={item.icon} containerStyle={styles.icon} size={55}/>
                            <Text style={{color: 'white', textAlign: 'center', marginBottom: 10, fontFamily: 'Poppins_700Bold'}}>{item.title}</Text>
                        </Pressable>
                        )
                    }}
                    numColumns={2}
                    keyExtractor = {item => item.key}
                />
            <BottomBar navigation={this.props.navigation} color={'#FFD900'}/>
        </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        aspectRatio: 1,
        width: '35%',
        marginHorizontal: '5%',
        borderRadius: 20, 
    },
    grid: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        marginHorizontal: '5%'
    },

    icon: {
        flex: 1, 
        marginTop: 10
    }

})