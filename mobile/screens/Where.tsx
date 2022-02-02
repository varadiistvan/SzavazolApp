import React from "react"
import { StatusBar } from "expo-status-bar"
import { View, Text, StyleSheet, Button } from "react-native"

import { BottomBar } from "./BottomBar"

interface WhereProps {
  navigation: any
}

export const Where = ({ navigation }: WhereProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <StatusBar hidden={true} />
      <Text> Where </Text>
      {/* <BottomBar navigation={this.props.navigation} color={'#BA3692'}/> */}
    </View>
  )
}
