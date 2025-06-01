import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SeasonTopScreen from "../currentSeasonPage/currentSeasonTopScreen/SeasonTopScreen";

export default function PreviousSeason({ route }) {
  const { areNumbersVisible } = route.params;

  return (
    <View style={styles.container}>
      <SeasonTopScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: "30",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
