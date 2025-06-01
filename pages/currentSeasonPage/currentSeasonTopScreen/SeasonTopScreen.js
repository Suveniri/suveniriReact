import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SeasonTopScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentlyEarned, setCurrentlyEarned] = useState(13140);
  const [joskoRequest, setJoskoRequest] = useState(22222);

  return (
    <View style={styles.container}>
      <Text style={styles.block}>{currentDate.getFullYear()}.</Text>
      <Text style={styles.block}>Zarada: {currentlyEarned} €</Text>
      <Text style={styles.block}>Ukupno: {joskoRequest} €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "azure",
  },
  block: {
    width: 125,
    height: 100,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "black",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 10,
    flexWrap: "wrap",
    flex: 1,
  },
});
