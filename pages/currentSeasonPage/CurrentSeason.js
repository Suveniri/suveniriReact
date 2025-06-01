import React from "react";
import { View, Text, StyleSheet } from "react-native";
import SeasonTopScreen from "./currentSeasonTopScreen/SeasonTopScreen";

export default function CurrentSeason() {
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
