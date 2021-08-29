import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

import BottomBar from './BottomBar';

export default class Compass extends React.Component {
    constructor(props) {
        super(props)
        var kérdések = []

        for(var i = 0; i < 10; i++) {
            kérdések.push({kérdés: 'Valamilyen politikai kérdés', válaszok: []})
            for(var j = 0; j < 4; j++) {
                var x = Math.round(Math.random()*10) - 5
                var y = Math.round(Math.random()*10) - 5
                kérdések[i].válaszok.push({szöveg: `Vízszintes ${x}, függőleges ${y}`, érték: {x: x, y: y}})
            }
        }

        for(var i = kérdések.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            [kérdések[i], kérdések[j]] = [kérdések[j], kérdések[i]]
        }

        this.state = {}
    }
    render(){
        return(
            <View style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <StatusBar hidden={true} />
                <Text> Compass </Text>
                {/* <BottomBar navigation={this.props.navigation} color={'orange'}/> */}
            </View>
        )
    }
}