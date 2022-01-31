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
            kérdések.push({kérdés: 'Valamilyen politikai kérdés', válaszok: []})
            for(var j = 0; j < 4; j++) {
                var x = Math.round(Math.random()*10) - 5
                var y = Math.round(Math.random()*10) - 5
                kérdések[i].válaszok.push({key: j, szöveg: `Vízszintes ${x}, függőleges ${y}`, érték: {x: x, y: y}, selected: null})
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

        var pártok = []

        for(var i = 0; i < 6; i++) {
            pártok.push({key: i, név: `Párt ${i}`, coordinates: {x: Math.round(Math.random()*20 - 10), y: Math.round(Math.random()*20-10)}})
        }

        this.state = {kérdések: kérdések, currentQuestion: 0, finished: false, coordinates: {x: 0, y: 0}, selected: null, pártCheck: false, pártok: pártok}


    }
    render(){
        if(!this.state.finished) {
            return(
                <SafeAreaView style={{
                    flex: 1,
                    alignItems: "center"
                }}>
                    <Text style={{fontFamily: 'Poppins_400Regular', fontWeight: 'bold', fontSize: 20, padding: 40}}>
                        {`${this.state.currentQuestion}. ${this.state.kérdések[this.state.currentQuestion].kérdés}`}
                    </Text>
                    <View style={{flex: 5, justifyContent: 'space-around', width: '100%'}}>
                        {this.state.kérdések[this.state.currentQuestion].válaszok.map(item => {
                            return(
                                <View key={item.key} style={{width: '100%', alignItems: 'center'}}> 
                                    <Pressable style={{borderColor: 'gray', borderWidth: 1, borderRadius: 20, width: '80%', backgroundColor: this.state.kérdések[this.state.currentQuestion].selected == item.key? 'green': 'transparent'}} onPress={() => {
                                            this.state.kérdések[this.state.currentQuestion].selected = item.key;
                                            this.setState({})
                                        }}>
                                        <Text style={{padding: 5, textAlign: 'center'}}>
                                            {item.szöveg}
                                        </Text>
                                    </Pressable>
                                </View>
                            )
                        })}
                    </View>
                    
                    <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                        <Pressable style={{display: 'flex', flexDirection: 'row', alignItems: 'center', opacity: this.state.currentQuestion == 0? 0.5: 1}} onPress={() => {
                            if(this.state.currentQuestion !== 0) {
                                this.setState({currentQuestion: this.state.currentQuestion - 1, coordinates: {x: this.state.coordinates.x - this.state.kérdések[this.state.currentQuestion-1].válaszok[this.state.kérdések[this.state.currentQuestion-1].selected].érték.x, y: this.state.coordinates.y - this.state.kérdések[this.state.currentQuestion-1].válaszok[this.state.kérdések[this.state.currentQuestion-1].selected].érték.y}})
                            }
                        }} >
                            <Icon name='arrow-back' />
                            <Text>Vissza</Text>
                        </Pressable>
                        <Pressable style={{display: 'flex', flexDirection: 'row', alignItems: 'center', opacity: this.state.kérdések[this.state.currentQuestion].selected == null? 0.5: 1}} onPress={() => {
                            if(this.state.kérdések[this.state.currentQuestion].selected != null) {
                                var értékek = this.state.kérdések[this.state.currentQuestion].válaszok[this.state.kérdések[this.state.currentQuestion].selected].érték
                                if(this.state.currentQuestion == this.state.kérdések.length-1) {
                                    this.setState({finished: true, coordinates: {x: this.state.coordinates.x > 10? 10: this.state.coordinates.x < -10? -10: this.state.coordinates.x, y: this.state.coordinates.y > 10? 10: this.state.coordinates.y < -10? -10: this.state.coordinates.y}})
                                }
                                else this.setState({coordinates: {x: this.state.coordinates.x + értékek.x, y: this.state.coordinates.y + értékek.y}, currentQuestion: this.state.currentQuestion + 1, selected: null})
                            }
                            
                        }} >
                            <Text>Tovább</Text>
                            <Icon name='arrow-forward' />
                        </Pressable>
                    </View>
    
                    <View style={{flex: 1}}>
                        <ProgressBar style progress={this.state.currentQuestion/this.state.kérdések.length} />
                    </View>
                    {/* <BottomBar navigation={this.props.navigation} color={'orange'}/> */}
                </SafeAreaView>
            )
        }
        else {
            return(
                <SafeAreaView style={{justifyContent: 'space-evenly', alignItems: 'center', flex: 1, height: '100%'}}>
                    <View style={{width: '100%', flex: 1}}>
                        <Svg width="100%" height='100%' viewBox="0 0 220 220" >
                            <Rect fill="#F9BBBB" x="10" y="10" width="100" height="100"  />
                            <Rect fill="#C9E5BD" x="10" y="110" width="100" height="100"  />
                            <Rect fill="#93DAF8" x="110" y="10" width="100" height="100"  />
                            <Rect fill="#F5F5A9" x="110" y="110" width="100" height="100" />
                            <Line x1="10" y1="110" x2="210" y2="110" stroke="black" strokeWidth="0.8" />
                            <Line x1="110" y1="10" x2="110" y2="210" stroke="black" strokeWidth="0.8" />
                            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 110, 120, 130, 140, 150, 160, 170, 180, 190].map(item => {
                                return(
                                    <Line key={item/10} x1={item+10} y1="10" x2={item+10} y2="210" stroke="black" strokeWidth="0.1" />
                                )
                            })}
                            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 110, 120, 130, 140, 150, 160, 170, 180, 190].map(item => {
                                return(
                                    <Line key={item/10} x1="10" y1={item+10} x2="210" y2={item+10} stroke="black" strokeWidth="0.1" />
                                )
                            })}
                            <Circle  cx={(this.state.coordinates.x*10 + 110).toString()} cy={(this.state.coordinates.y*-10 + 110).toString()} r="5" fill="red" />
                            <SvgText fill="red" strokeWidth="0.3" stroke="red" fontSize="8" fontFamily="Poppins_400Regular" x={this.state.coordinates.x*10+110} y={this.state.coordinates.y>0? this.state.coordinates.y*-10 + 125: this.state.coordinates.y*-10 + 100} textAnchor="middle" >
                                A Te eredményed
                            </SvgText>
                            {this.state.pártCheck?
                            this.state.pártok.map(item => {
                                return(
                                    <Circle key={item.key} cx={item.coordinates.x*10 + 110} cy={item.coordinates.y*-10 + 110} r="5" fill="white" />
                                )
                            })
                            :null}
                            {this.state.pártCheck?
                            this.state.pártok.map(item => {
                                return(
                                    <SvgText key={item.key} fill="white" strokeWidth="0.2" stroke="white" fontSize="8" fontFamily="Poppins_400Regular" x={item.coordinates.x*10+110} y={item.coordinates.y*-10 + 100} textAnchor="middle" >
                                        {item.név}
                                    </SvgText>
                                )
                            })
                            :null}
                        </Svg>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', width: '100%', justifyContent: 'space-evenly'}}>
                        <Text>
                            {`Gazdaság: ${this.state.coordinates.x}`}
                        </Text>
                        <Text>
                            {`Társadalom: ${this.state.coordinates.y}`}
                        </Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Text>
                                Mutassa a pártokat
                            </Text>
                            <Icon name={this.state.pártCheck? "check-box":"check-box-outline-blank"} onPress={() => this.setState({pártCheck: !this.state.pártCheck})} />
                        </View>
                        <Pressable style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', borderColor: "gray", borderWidth: 1, borderRadius: 20, width: '80%'}} onPress={() => this.setState({currentQuestion: 0, finished: false, coordinates: {x: 0, y: 0}, selected: null, pártCheck: false})} >
                            <Text style={{padding: 10}}>Kitöltöm újra</Text>
                            <Icon style={{padding: 10}} name="refresh" />
                        </Pressable>
                        
                        <Pressable style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} onPress={() => this.props.navigation.navigate("Who")}>
                            <Text style={{padding: 5}}>Pártok programjai</Text>
                            <Icon style={{padding: 5}} name="chevron-right" />
                        </Pressable>
                    </View>
                    {/* <BottomBar navigation={this.props.navigation} color={'#FFA300'}/> */}
                </SafeAreaView>
            )
        }
        
    }
}