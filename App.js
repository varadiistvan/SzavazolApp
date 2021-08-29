import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Appearance} from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { setCustomText } from 'react-native-global-props';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Icon } from 'react-native-elements'

import Home from './screens/Home';
import Compass from './screens/Compass';
import How from './screens/How';
import Quiz from './screens/Quiz';
import Where from './screens/Where';
import Who from './screens/Who';
import Why from './screens/Why';
import Egyéni from './screens/Egyéni';
import Országos from './screens/Országos';
import Program from './screens/Program';


const Stack = createStackNavigator()

var ready = true

// AsyncStorage.setItem("theme", "light")

// AsyncStorage.getAllKeys().then(ree => {console.log(ree.includes("theme"));ree.includes("theme")? AsyncStorage.getItem("theme").then(re => global.theme = re) : global.theme = Appearance.getColorScheme()}).then(ready = true)

global.theme = "light"




const customTextProps = {
  style:{
    fontFamily: 'Poppins_400Regular'
  }
}

setCustomText(customTextProps)

DarkTheme.colors.background = "#121212"
DarkTheme.colors.card = "#303030"


export default function App() {

  const [fontsloaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  if(!fontsloaded || !ready) {
    return null
  }
  else{ 
    return (
      <NavigationContainer theme={global.theme == "light"? DefaultTheme :DarkTheme}>
          <StatusBar hidden={true} />
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" options={{title: ""}} component={Home}/>
            <Stack.Screen name="Compass" options={{title: "Yeet"}} component={Compass}/>
            <Stack.Screen name="How" options={{title: ""}} component={How}/>
            <Stack.Screen name="Quiz" options={{title: ""}} component={Quiz}/>
            <Stack.Screen name="Where" options={{title: ""}} component={Where}/>
            <Stack.Screen name="Who" options={{title: ""}} component={Who}/>
            <Stack.Screen name="Why" options={{title: ""}} component={Why}/>
            <Stack.Screen name="Egyéni" options={{title: ""}} component={Egyéni} />
            <Stack.Screen name="Országos" options={{title: ""}} component={Országos} />
            <Stack.Screen name="Program" options={{title: ""}} component={Program} />
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
