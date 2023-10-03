import { useState } from "react"
import { StatusBar } from "expo-status-bar"
import * as tensorflow from "@tensorflow/tfjs"
import * as FileSystem from "expo-file-system"
import * as ImagePicker from "expo-image-picker"
import { decodeJpeg } from "@tensorflow/tfjs-react-native"
import * as mobilenet from "@tensorflow-models/mobilenet"
import { ActivityIndicator, Image, Alert, View } from "react-native"

import { Button } from "./components/Button"
import { Classification, ClassificationData } from "./components/Classification"

import { styles } from "./styles"

const placeholderImg =
  "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=170667a&w=0&k=20&c=Q7gLG-xfScdlTlPGFohllqpNqpxsU1jy8feD_fob87U="

export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedImageUri, setSelectedImageUri] = useState("")
  const [results, setResults] = useState<ClassificationData[]>([])

  async function imageClassification(imageUri: string) {
    setResults([])

    await tensorflow.ready()
    const model = await mobilenet.load()

    const imageBase64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    })

    const imgBuffer = tensorflow.util.encodeString(imageBase64, "base64").buffer
    const raw = new Uint8Array(imgBuffer)
    const imageTensor = decodeJpeg(raw)

    const classificationResult = await model.classify(imageTensor)

    setResults(classificationResult)
  }

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
        const { uri } = result.assets[0]

        setSelectedImageUri(uri)
        await imageClassification(uri)
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

      <View style={styles.results}>
        {results.map((result) => (
          <Classification key={result.className} data={result} />
        ))}
      </View>

      {isLoading ? (
        <ActivityIndicator color="#5F1FBB" />
      ) : (
        <Button title="Selecionar image" onPress={handleSelectImage} />
      )}
    </View>
  )
}
