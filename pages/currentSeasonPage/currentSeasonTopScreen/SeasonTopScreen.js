import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SeasonTopScreen({
  selectedYear,
  areNumbersVisible,
  totalRevenue,
  totalOrderedValue,
}) {
  if (!areNumbersVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.fullWidthBlock}>{selectedYear}.</Text>
      <View style={styles.row}>
        <Text style={styles.halfBlock}>
          Zarada: {totalRevenue ? totalRevenue : 0} €
        </Text>
        <Text style={styles.halfBlock}>Naručeno: {totalOrderedValue} €</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5dd",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  fullWidthBlock: {
    width: "100%",
    height: 50,
    fontSize: 20,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 10,
    fontWeight: "bold",
  },
  halfBlock: {
    width: "50%",
    height: 50,
    fontSize: 14,
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "black",
    textAlign: "left",
    textAlignVertical: "center",
    padding: 4,
  },
});
