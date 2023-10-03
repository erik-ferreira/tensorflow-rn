import { View, Text } from "react-native"

import { styles } from "./styles"

export interface ClassificationData {
  probability: number
  className: string
}

interface ClassificationProps {
  data: ClassificationData
}

export function Classification({ data }: ClassificationProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.probability}>{data.probability.toFixed(4)}</Text>
      <Text style={styles.className}>{data.className}</Text>
    </View>
  )
}
