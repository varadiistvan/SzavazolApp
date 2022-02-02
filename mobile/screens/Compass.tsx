import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"

import { BottomBar } from "./BottomBar"
import { SafeAreaView } from "react-native"
import { Pressable } from "react-native"
import ProgressBar from "react-native-progress/Bar"
import { Icon } from "react-native-elements/dist/icons/Icon"
import Svg, { Circle, Rect, Line, Text as SvgText } from "react-native-svg"
import { CheckBox } from "react-native-elements/dist/checkbox/CheckBox"
import { CompassResults } from "./components/CompassResults"

interface CompassProps {
  navigation: any
}

type Coordinates = {
  x: number
  y: number
}

type Answer = {
  key: number
  szöveg: string
  érték: Coordinates
}

type Question = {
  kérdés: string
  válaszok: Answer[]
  selected: number | null
}

export const Compass = ({ navigation, ...ViewProps }: CompassProps) => {
  const [finished, setFinished] = useState<boolean>(false)

  const [currentQuestion, setCurrentQuestion] = useState<number>(0)

  const [kérdések, setKérdések] = useState<Question[]>([])

  const [coordinates, setCoordinates] = useState<Coordinates>({ x: 0, y: 0 })

  const [selected, setSelected] = useState<null | number>(null)

  useEffect(() => {
    let kérdésConstructor: Question[] = []

    for (let i = 0; i < 10; i++) {
      kérdésConstructor.push({
        kérdés: "Valamilyen politikai kérdés",
        válaszok: [],
        selected: null,
      })
      for (let j = 0; j < 4; j++) {
        let x = Math.round(Math.random() * 10) - 5
        let y = Math.round(Math.random() * 10) - 5
        kérdésConstructor[i].válaszok.push({
          key: j,
          szöveg: `Vízszintes ${x}, függőleges ${y}`,
          érték: { x: x, y: y },
        })
      }
    }

    for (let i = kérdésConstructor.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1))

      try {
        ;[kérdésConstructor[i], kérdésConstructor[j]] = [
          kérdésConstructor[j],
          kérdésConstructor[i],
        ]
      } catch (e) {
        console.log(e)
      }
    }

    setKérdések(kérdésConstructor)
  }, [])

  if (!finished && !!kérdések.length) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_400Regular",
            fontWeight: "bold",
            fontSize: 20,
            padding: 40,
          }}
        >
          {`${currentQuestion}. ${kérdések[currentQuestion].kérdés}`}
        </Text>
        <View
          style={{ flex: 5, justifyContent: "space-around", width: "100%" }}
        >
          {kérdések[currentQuestion].válaszok.map((item) => {
            return (
              <View
                key={item.key}
                style={{ width: "100%", alignItems: "center" }}
              >
                <Pressable
                  style={{
                    borderColor: "gray",
                    borderWidth: 1,
                    borderRadius: 20,
                    width: "80%",
                    backgroundColor:
                      kérdések[currentQuestion].selected == item.key
                        ? "green"
                        : "transparent",
                  }}
                  onPress={() => {
                    kérdések[currentQuestion].selected = item.key
                    setKérdések((lastValue) =>
                      lastValue.map((kérdés, index) => {
                        if (index == currentQuestion) {
                          return { ...kérdés, selected: item.key }
                        } else {
                          return kérdés
                        }
                      }),
                    )
                  }}
                >
                  <Text style={{ padding: 5, textAlign: "center" }}>
                    {item.szöveg}
                  </Text>
                </Pressable>
              </View>
            )
          })}
        </View>

        <View
          style={{
            flex: 2,
            flexDirection: "row",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              opacity: currentQuestion == 0 ? 0.5 : 1,
            }}
            onPress={() => {
              if (currentQuestion !== 0) {
                setCurrentQuestion((lastValue) => lastValue - 1)

                const lastÉrtékek =
                  kérdések[currentQuestion - 1].válaszok[
                    kérdések[currentQuestion - 1].selected
                  ].érték

                setCoordinates((lastValue) => ({
                  x: lastValue.x - lastÉrtékek.x,
                  y: lastValue.y - lastÉrtékek.y,
                }))
              }
            }}
          >
            <Icon name="arrow-back" />
            <Text>Vissza</Text>
          </Pressable>
          <Pressable
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              opacity: kérdések[currentQuestion].selected == null ? 0.5 : 1,
            }}
            onPress={() => {
              if (kérdések[currentQuestion].selected != null) {
                const értékek =
                  kérdések[currentQuestion].válaszok[
                    kérdések[currentQuestion].selected
                  ].érték
                if (currentQuestion == kérdések.length - 1) {
                  setFinished(true)
                  setCoordinates((lastValue) => ({
                    x:
                      lastValue.x > 10
                        ? 10
                        : lastValue.x < -10
                        ? -10
                        : lastValue.x,
                    y:
                      lastValue.y > 10
                        ? 10
                        : lastValue.y < -10
                        ? -10
                        : lastValue.y,
                  }))
                } else {
                  setCoordinates((lastValue) => ({
                    x: lastValue.x + értékek.x,
                    y: lastValue.y + értékek.y,
                  }))
                  setCurrentQuestion((lastValue) => lastValue + 1)
                  setSelected(null)
                }
              }
            }}
          >
            <Text>Tovább</Text>
            <Icon name="arrow-forward" />
          </Pressable>
        </View>

        <View style={{ flex: 1 }}>
          <ProgressBar style progress={currentQuestion / kérdések.length} />
        </View>
        {/* <BottomBar navigation={this.props.navigation} color={'orange'}/> */}
      </SafeAreaView>
    )
  } else if (finished) {
    return (
      <CompassResults
        setCoordinates={setCoordinates}
        setFinished={setFinished}
        setSelected={setSelected}
        setCurrentQuestion={setCurrentQuestion}
        coordinates={coordinates}
        navigation={navigation}
      />
    )
  } else {
    return <Text>Huppszi, nincs kérdés</Text>
  }
}
