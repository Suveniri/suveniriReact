import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SeasonTopScreen({
  selectedYear,
  areNumbersVisible,
  totalRevenue,
  totalOrderedValue,
}) {
  const [currentlyEarned, setCurrentlyEarned] = useState(totalRevenue);
  const [joskoRequest, setJoskoRequest] = useState(totalOrderedValue);

  if (!areNumbersVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.block}>{selectedYear}.</Text>
      <Text style={styles.block}>
        Zarada: {totalRevenue ? totalRevenue : 0} €
      </Text>
      <Text style={styles.block}>Naručeno: {totalOrderedValue} €</Text>
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
    fontSize: 22,
    borderWidth: 2,
    borderColor: "black",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 10,
    flexWrap: "wrap",
    flex: 1,
  },
});
