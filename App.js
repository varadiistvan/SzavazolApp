import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './screens/Home';
import Compass from './screens/Compass';
import How from './screens/How';
import Quiz from './screens/Quiz';
import Where from './screens/Where';
import Who from './screens/Who';
import Why from './screens/Why';

const Stack = createStackNavigator()


export default function App() {
  return (
    <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" options={{title: ""}} component={Home}/>
          <Stack.Screen name="Compass" options={{title: ""}} component={Compass}/>
          <Stack.Screen name="How" options={{title: ""}} component={How}/>
          <Stack.Screen name="Quiz" options={{title: ""}} component={Quiz}/>
          <Stack.Screen name="Where" options={{title: ""}} component={Where}/>
          <Stack.Screen name="Who" options={{title: ""}} component={Who}/>
          <Stack.Screen name="Why" options={{title: ""}} component={Why}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}
