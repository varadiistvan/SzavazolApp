import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Button } from 'react-native';

import { BottomBar } from './BottomBar';
import { SafeAreaView } from 'react-native';
import { Pressable } from 'react-native';
import ProgressBar from 'react-native-progress/Bar'
import { Icon } from 'react-native-elements/dist/icons/Icon';
import Svg, { Circle, Rect, Line, Text as SvgText } from 'react-native-svg'
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox';
import { QuizResults } from './components/QuizResults';

interface QuizProps {
    navigation: any
}

type Answer = {
    szöveg: string
    jó: boolean
}

type Question = {
    kérdés: string
    válaszok: Answer[]
}

export const Quiz = ({
    navigation,
}: QuizProps) => {

    const shuffleVálaszok = (kérdések) => {
        for(let a of kérdések) {
            for(let i = a.válaszok.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1))
                
                try{
                    [a.válaszok[i], a.válaszok[j]] = [a.válaszok[j], a.válaszok[i]]
                }
                catch(e) {
                    console.log(e);
                }
            }
        }
    }

    const shuffleArray = (kérdések) => {
        for(let i = kérdések.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1))
            
            try{
                [kérdések[i], kérdések[j]] = [kérdések[j], kérdések[i]]
            }
            catch(e) {
                console.log(e);
            }
        }

        shuffleVálaszok(kérdések)
    }


    const [kérdések, setKérdések] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [pontszám, setPontszám] = useState<number>(0);
    const [selected, setSelected] = useState<null | number>(null);
    const [finished, setFinished] = useState<boolean>(false);

    useEffect(() => {
        let kérdésekConstructor: Question[] = []
        for(let i = 0; i < 10; i++) {
            kérdésekConstructor.push({kérdés: 'Valamilyen kvízkérdés', válaszok: [{szöveg: "Jó válasz", jó: true}, {szöveg: "Rossz válasz", jó: false}, {szöveg: "Rossz válasz", jó: false}]})
        }

        shuffleArray(kérdésekConstructor)

        setKérdések(kérdésekConstructor)
    }, [])
    
    

    if(!finished && !!kérdések.length) {
        return(
            <SafeAreaView style={{
                flex: 1,
                alignItems: "center",
                backgroundColor: "#0088CC"
            }}>
                <Text style={{fontFamily: 'Poppins_400Regular', fontSize: 16, paddingTop: 40, color: "white"}}>{`${pontszám} pont`}</Text>
                <Text style={{fontFamily: 'Poppins_400Regular', fontWeight: 'bold', fontSize: 20, padding: 40, color: "white"}}>
                    {`${currentQuestion}. ${kérdések[currentQuestion].kérdés}`}
                </Text>
                <View style={{flex: 5, justifyContent: 'space-around', width: '100%'}}>
                    {kérdések[currentQuestion].válaszok.map((item, index) => {
                        return(
                            <View key={index} style={{width: '100%', alignItems: 'center',}}> 
                                <Pressable style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderColor: 'gray', borderWidth: 1, borderRadius: 20, width: '80%', backgroundColor: selected == index? item.jó? 'green': 'red': selected === null? 'white': item.jó? 'green': 'white'}} onPress={() => {
                                        if(selected === null) {
                                            setSelected(index)
                                            setPontszám(lastValue => item.jó? lastValue+100: lastValue)
                                        }
                                    }}>
                                    <Text style={{padding: 20, textAlign: 'center', marginHorizontal: 40}}>
                                        {item.szöveg}
                                    </Text>
                                    <Text>{selected === index? item.jó? '+100': '+0': null}</Text>
                                </Pressable>
                            </View>
                        )
                    })}
                </View>
                
                <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                    <Pressable style={{display: 'flex', flexDirection: 'row', alignItems: 'center', opacity: selected == null? 0.5: 1}} onPress={() => {
                        if(selected != null) {
                            if(currentQuestion == kérdések.length-1) {
                                setFinished(true)
                            }
                            setCurrentQuestion(lastValue => lastValue+1)
                            setSelected(null)
                        }
                        
                    }} >
                        <Text style={{color: "white", fontWeight: 'bold', fontSize: 20}}>Tovább</Text>
                        <Icon name='arrow-forward' />
                    </Pressable>
                </View>

                <View style={{flex: 1}}>
                    <ProgressBar unfilledColor="white" borderWidth={1} borderColor='white' color="#0088CC" width={180} height={20} borderRadius={30} progress={currentQuestion/kérdések.length} />
                </View>
                {/* <BottomBar navigation={this.props.navigation} color={'orange'}/> */}
            </SafeAreaView>
        )
    }
    else if(finished) {
        return(<QuizResults pontszám={pontszám} backClick={  () => {
            let newKérdések = [...kérdések]
            shuffleArray(newKérdések)
            setCurrentQuestion(0)
            setFinished(false)
            setPontszám(0)
            setSelected(null)
            setKérdések(newKérdések)
         }} />)
    }
    else {
        return(<Text>Huppsz, nincs kérdés</Text>)
    }

}