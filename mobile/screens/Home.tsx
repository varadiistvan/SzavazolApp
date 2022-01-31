import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Pressable, Appearance, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from 'react-native-elements';


import { BottomBar } from './BottomBar';

type Item = {
    title: string
    backgroundLight: string
    backgroundDark: string
    icon: string
    key: string
}

interface HomeProps {
    navigation: any
} 

export const Home = ({
    navigation
}: HomeProps) => {
    const newItems: Item[] = [{title: "KIRE SZAVAZHATOK?", backgroundLight: "#FF0210", backgroundDark: "darkred", icon: 'people', key: "Who"},
            {title: "POLITIKAI IRÁNYTŰ", backgroundLight: "#FFA300", backgroundDark: "darkorange", icon: 'explore', key: "Compass"},
            {title: "MIÉRT SZAVAZZAK?", backgroundLight: "#68BE00", backgroundDark: "mediumseagreen", icon: 'help', key: "Why"},
            {title: "HOL SZAVAZZAK?", backgroundLight: "#2DD9D9", backgroundDark: "#009092", icon: 'map', key: "Where"},
            {title: "KVÍZ", backgroundLight: "#0088CC", backgroundDark: "blue", icon: 'list', key: "Quiz"},
            {title: "HOGYAN SZAVAZHATOK", backgroundLight: "#BA3692", backgroundDark: "darkorchid", icon: 'info', key: "How"}]
    
    const [items, setItems] = useState<Item[]>(newItems);

    return(
        <SafeAreaView style={{
            flex: 1,
            flexDirection: 'column',
            marginTop: 0,
            backgroundColor: "#FFD900",
        }}>
            <FlatList 
                contentContainerStyle={styles.grid}
                data={items}
                renderItem={({ item }) => {
                    return(
                    <Pressable style={[styles.button, {backgroundColor: item.backgroundLight }]} onPress={() => {navigation.navigate(item.key)}}>
                        <Icon name={item.icon} containerStyle={styles.icon} size={55}/>
                        <Text style={{color: 'white', textAlign: 'center', marginBottom: 10, width: '90%',fontFamily: 'Poppins_700Bold'}}>{item.title}</Text>
                    </Pressable>
                    )
                }}
                numColumns={2}
                keyExtractor = {item => item.key}
            />
        {/* <BottomBar navigation={this.props.navigation} color={'#FFD900'}/> */}
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    button: {
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '35%',
        marginHorizontal: '5%',
        borderRadius: 20, 
    },
    grid: {
        padding: 0,
        flex: 1,
        width: '100%',
        justifyContent: 'space-evenly',
        marginHorizontal: '5%'
    },

    icon: {
        flex: 1, 
        marginTop: 10
    },

})