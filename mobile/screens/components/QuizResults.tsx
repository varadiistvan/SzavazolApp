import React from 'react'
import { SafeAreaView, View, Pressable, Text } from "react-native"
import { Icon } from "react-native-elements"

interface QuizResultProps {
    pontszám: number
    backClick: (...args: any[]) => any
}

export const QuizResults = ({
    pontszám,
    backClick
}: QuizResultProps) => {

    return(
        <SafeAreaView style={{flex: 1, height: '100%', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 40, backgroundColor: "#0088CC"}}>
            <View> 
                <Icon name="list" size={70} color="white" />
                <Text style={{color: "white", fontSize: 30, fontWeight: 'bold'}} >Az eredményed:</Text> 
            </View>
            
            <View>
                <Text style={{color: "white", fontWeight: 'bold', fontSize: 40}}>{`${pontszám} pont`}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10}}>
                    <Icon name="share" color="white" size={30} style={{paddingHorizontal: 3}} />
                    <Icon name="facebook" color="white" size={30} style={{paddingHorizontal: 3}} />
                </View>
            </View>
            <Pressable style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} onPress={backClick}>
                <Text style={{color: "white", fontSize: 20, fontWeight: 'bold'}} >Új játék</Text>
                <Icon name="refresh" color="white" />
            </Pressable>
        </SafeAreaView>
    )
}