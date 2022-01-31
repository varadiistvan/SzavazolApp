import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

import BottomBar from './BottomBar';
import { SafeAreaView } from 'react-native';
import { Pressable } from 'react-native';
import ProgressBar from 'react-native-progress/Bar'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Svg, { Circle, Rect, Line, Text as SvgText } from 'react-native-svg'
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';

export default class Compass extends React.Component {
    constructor(props) {
        super(props)
        
        var kérdések = []

        for(var i = 0; i < 10; i++) {
            kérdések.push({kérdés: 'Valamilyen kvízkérdés', válaszok: [{szöveg: "Jó válasz", jó: true}, {szöveg: "Rossz válasz", jó: false}, {szöveg: "Rossz válasz", jó: false}]})
        }

        for(a of kérdések) {
            for(var i = a.válaszok.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1))
                
                try{
                    [a.válaszok[i], a.válaszok[j]] = [a.válaszok[j], a.válaszok[i]]
                }
                catch(e) {
                    console.log(e);
                }
            }
        }

        this.state = {kérdések: kérdések, currentQuestion: 0, finished: false, pontszám: 0, selected: null,}


    }
    render(){
        if(!this.state.finished) {
            return(
                <SafeAreaView style={{
                    flex: 1,
                    alignItems: "center",
                    backgroundColor: "#0088CC"
                }}>
                    <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 16, paddingTop: 40, color: "white"}}>{`${this.state.pontszám} pont`}</Text>
                    <Text style={{fontFamily: 'Poppins_400Regular', fontWeight: 'bold', fontSize: 20, padding: 40, color: "white"}}>
                        {`${this.state.currentQuestion}. ${this.state.kérdések[this.state.currentQuestion].kérdés}`}
                    </Text>
                    <View style={{flex: 5, justifyContent: 'space-around', width: '100%'}}>
                        {this.state.kérdések[this.state.currentQuestion].válaszok.map((item, index) => {
                            return(
                                <View key={index} style={{width: '100%', alignItems: 'center',}}> 
                                    <Pressable style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 20, width: '80%', backgroundColor: this.state.selected == index? item.jó? 'green': 'red': this.state.selected === null? 'white': item.jó? 'green': 'white'}} onPress={() => {
                                            if(this.state.selected === null) {
                                                this.setState({selected: index, pontszám: item.jó? this.state.pontszám+100: this.state.pontszám})
                                            }
                                        }}>
                                        <Text style={{padding: 20, textAlign: 'center', marginHorizontal: 40}}>
                                            {item.szöveg}
                                        </Text>
                                        <Text>{this.state.selected === index? item.jó? '+100': '+0': null}</Text>
                                    </Pressable>
                                </View>
                            )
                        })}
                    </View>
                    
                    <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                        <Pressable style={{display: 'flex', flexDirection: 'row', alignItems: 'center', opacity: this.state.selected == null? 0.5: 1}} onPress={() => {
                            if(this.state.selected != null) {
                                var értékek = this.state.kérdések[this.state.currentQuestion].válaszok[this.state.selected].érték
                                if(this.state.currentQuestion == this.state.kérdések.length-1) {
                                    this.setState({finished: true})
                                }
                                this.setState({currentQuestion: this.state.currentQuestion + 1, selected: null})
                            }
                            
                        }} >
                            <Text style={{color: "white", fontWeight: 'bold', fontSize: 20}}>Tovább</Text>
                            <Icon name='arrow-forward' />
                        </Pressable>
                    </View>
    
                    <View style={{flex: 1}}>
                        <ProgressBar unfilledColor="white" borderWidth={1} borderColor='white' color="#0088CC" width={180} height={20} borderRadius={30} progress={this.state.currentQuestion/this.state.kérdések.length} />
                    </View>
                    {/* <BottomBar navigation={this.props.navigation} color={'orange'}/> */}
                </SafeAreaView>
            )
        }
        else {
            return(
                <SafeAreaView style={{flex: 1, height: '100%', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 40, backgroundColor: "#0088CC"}}>
                    <View> 
                        <Icon name="list" size={70} color="white" />
                        <Text style={{color: "white", fontSize: 30, fontWeight: 'bold'}} >Az eredményed:</Text> 
                    </View>
                    
                    <View>
                        <Text style={{color: "white", fontWeight: 'bold', fontSize: 40}}>{`${this.state.pontszám} pont`}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                            <Icon name="share" color="white" size={30} style={{paddingHorizontal: 3}} />
                            <Icon name="facebook" color="white" size={30} style={{paddingHorizontal: 3}} />
                        </View>
                    </View>
                    <Pressable style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={() => {
                        var kérdések = this.state.kérdések
                        for(a of kérdések) {
                            for(var i = a.válaszok.length - 1; i > 0; i--) {
                                var j = Math.floor(Math.random() * (i + 1))
                                
                                try{
                                    [a.válaszok[i], a.válaszok[j]] = [a.válaszok[j], a.válaszok[i]]
                                }
                                catch(e) {
                                    console.log(e);
                                }
                            }
                        }
                        for(var i = kérdések.length - 1; i > 0; i--) {
                            var j = Math.floor(Math.random() * (i + 1))
                            
                            try{
                                [kérdések[i], kérdések[j]] = [kérdések[j], kérdések[i]]
                            }
                            catch(e) {
                                console.log(e);
                            }
                        }
                        this.setState({currentQuestion: 0, finished: false, pontszám: 0, selected: null, kérdések: kérdések})
                    }}>
                        <Text style={{color: "white", fontSize: 20, fontWeight: 'bold'}} >Új játék</Text>
                        <Icon name="refresh" color="white" />
                    </Pressable>
                </SafeAreaView>
            )
        }
        
    }
}