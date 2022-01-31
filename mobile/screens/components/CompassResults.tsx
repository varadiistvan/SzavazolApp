import React, { useEffect, useState } from "react"
import { SafeAreaView, View, Pressable, Text } from "react-native"
import { Icon } from "react-native-elements"
import Svg, { Circle, Rect, Line, Text as SvgText } from 'react-native-svg'

type Coordinates = {
    x: number
    y: number
}

type Party = {
    key: number
    név: string
    coordinates: Coordinates
}

interface CompassResultsProps {
    coordinates: Coordinates
    setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>
    setSelected: React.Dispatch<React.SetStateAction<number>>
    setFinished: React.Dispatch<React.SetStateAction<boolean>>
    setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>
    navigation: any
}

export const CompassResults = ({
    coordinates,
    setCurrentQuestion,
    setCoordinates,
    setSelected,
    setFinished,
    navigation
}: CompassResultsProps) => {

    const [pártok, setPártok] = useState<Party[]>([]);
    const [pártCheck, setPártCheck] = useState<boolean>(false);

    let pártokConstructor: Party[] = []



    useEffect(() => {
        for(let i = 0; i < 6; i++) {
            pártokConstructor.push({key: i, név: `Párt ${i}`, coordinates: {x: Math.round(Math.random()*20 - 10), y: Math.round(Math.random()*20-10)}})
        }
        
        setPártok(pártokConstructor)
    }, [])


    return (
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
                        <Circle cx={(coordinates.x*10 + 110).toString()} cy={(coordinates.y*-10 + 110).toString()} r="5" fill="red" />
                        <SvgText fill="red" strokeWidth="0.3" stroke="red" fontSize="8" fontFamily="Poppins_400Regular" x={coordinates.x*10+110} y={coordinates.y>0? coordinates.y*-10 + 125: coordinates.y*-10 + 100} textAnchor="middle" >
                            A Te eredményed
                        </SvgText>
                        {pártCheck? pártok.map(item => {
                            return(
                                <Circle key={item.key} cx={item.coordinates.x*10 + 110} cy={item.coordinates.y*-10 + 110} r="5" fill="white" />
                            )
                        })
                        :null}
                        {pártCheck? pártok.map(item => {
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
                        {`Gazdaság: ${coordinates.x}`}
                    </Text>
                    <Text>
                        {`Társadalom: ${coordinates.y}`}
                    </Text>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text>
                            Mutassa a pártokat
                        </Text>
                        <Icon name={pártCheck? "check-box":"check-box-outline-blank"} onPress={() => setPártCheck(lastValue => !lastValue)} />
                    </View>
                    <Pressable style={{flexDirection: 'row', alignItems: 'center', justifyContent:'space-between', borderColor: "gray", borderWidth: 1, borderRadius: 20, width: '80%'}} onPress={() => {
                        setCurrentQuestion(0)
                        setFinished(false)
                        setCoordinates({x: 0, y: 0})
                        setSelected(null)
                        setPártCheck(false)
                    }} >
                        <Text style={{padding: 10}}>Kitöltöm újra</Text>
                        <Icon style={{padding: 10}} name="refresh" />
                    </Pressable>
                    
                    <Pressable style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} onPress={() => navigation.navigate("Who")}>
                        <Text style={{padding: 5}}>Pártok programjai</Text>
                        <Icon style={{padding: 5}} name="chevron-right" />
                    </Pressable>
                </View>
                {/* <BottomBar navigation={this.props.navigation} color={'#FFA300'}/> */}
            </SafeAreaView>
    )
}