import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AllSouvenirs() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is all souvenirs page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
