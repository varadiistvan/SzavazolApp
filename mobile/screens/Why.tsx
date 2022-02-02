import React from "react"
import { StatusBar } from "expo-status-bar"
import { View, Text, StyleSheet, Button } from "react-native"

import { BottomBar } from "./BottomBar"
import { SafeAreaView } from "react-native"
import { ScrollView } from "react-native"
import { Pressable } from "react-native"
import { Icon } from "react-native-elements"

interface WhyProps {
  navigation: any
}

export const Why = ({ navigation }: WhyProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView style={{ width: "100%" }}>
        <Text>Miért szavazzak?</Text>
        <Text>itt egy videó lesz</Text>
        <Text>
          feugiat sed lectus vestibulum mattis ullamcorper velit sed ullamcorper
          morbi tincidunt ornare massa eget egestas purus viverra accumsan in
          nisl nisi scelerisque eu ultrices vitae auctor eu augue ut lectus arcu
          bibendum at varius vel pharetra vel turpis nunc eget lorem dolor sed
          viverra ipsum nunc aliquet bibendum enim facilisis gravida neque
          convallis a cras semper auctor neque vitae tempus quam pellentesque
          nec nam aliquam sem et tortor consequat id porta nibh venenatis cras
          sed felis eget velit aliquet sagittis id consectetur purus ut faucibus
          pulvinar elementum integer enim neque volutpat ac tincidunt vitae
          semper quis lectus nulla at volutpat diam ut venenatis tellus in metus
          vulputate eu scelerisque felis imperdiet proin fermentum leo vel orci
          porta non pulvinar neque laoreet suspendisse interdum consectetur
          libero id faucibus nisl tincidunt eget nullam non nisi est sit amet
          facilisis magna etiam tempor orci eu lobortis elementum nibh tellus
          molestie nunc non blandit massa enim nec dui nunc mattis enim ut
          tellus elementum sagittis vitae et leo duis ut diam quam nulla
          porttitor massa id neque aliquam vestibulum morbi blandit cursus risus
          at ultrices mi tempus imperdiet nulla malesuada pellentesque elit eget
          gravida cum sociis natoque penatibus et magnis dis parturient montes
          nascetur
        </Text>

        <View style={{ alignItems: "center" }}>
          <Text>Neked is van beleszólásod!</Text>
          <Text>Szavazz te is!</Text>
        </View>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("How")}
        >
          <Text style={{ paddingVertical: 5 }}>
            Mit kell tudni a választásokról?
          </Text>
          <Icon style={{ paddingVertical: 5 }} name="chevron-right" />
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => navigation.navigate("Who")}
        >
          <Text style={{ paddingVertical: 5 }}>Kikre tudok szavazni?</Text>
          <Icon style={{ paddingVertical: 5 }} name="chevron-right" />
        </Pressable>
      </ScrollView>
      {/* <BottomBar navigation={this.props.navigation} color={'#68BE00'}/> */}
    </SafeAreaView>
  )
}
