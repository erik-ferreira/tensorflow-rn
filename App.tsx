import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import * as ImagePicker from "expo-image-picker"
import { ActivityIndicator, Image, Alert, View } from "react-native"

import { Button } from "./components/Button"

import { styles } from "./styles"

const placeholderImg =
  "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=170667a&w=0&k=20&c=Q7gLG-xfScdlTlPGFohllqpNqpxsU1jy8feD_fob87U="

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImageUri, setSelectedImageUri] = useState("")

  async function handleSelectImage() {
    setIsLoading(true)

    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      if (status !== "granted") {
        Alert.alert("Desculpe, precisamos acessar a galeria para prosseguir")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      })

      if (!result.canceled) {
        setSelectedImageUri(result.assets[0].uri)
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />

      <Image
        style={styles.image}
        source={{
          uri: selectedImageUri || placeholderImg,
        }}
      />

      <View style={styles.results} />

      {isLoading ? (
        <ActivityIndicator color="#5F1FBB" />
      ) : (
        <Button title="Selecionar image" onPress={handleSelectImage} />
      )}
    </View>
  )
}
