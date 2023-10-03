import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
    padding: 32,

    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: 250,
    height: 250,
    borderRadius: 8,
  },

  results: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "center",
    marginTop: 64,
  },
})
