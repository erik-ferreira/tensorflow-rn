import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import { Image, Text, View } from "react-native"

import { Button } from "./components/Button"

import { styles } from "./styles"

const placeholderImg =
  "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=170667a&w=0&k=20&c=Q7gLG-xfScdlTlPGFohllqpNqpxsU1jy8feD_fob87U="

export default function App() {
  const [selectedImageUri, setSelectedImageUri] = useState("")

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Image
        style={styles.image}
        source={{
          uri: selectedImageUri || placeholderImg,
        }}
      />

      <View style={styles.results}></View>

      <Button title="Selecionar image" />
    </View>
  )
}
