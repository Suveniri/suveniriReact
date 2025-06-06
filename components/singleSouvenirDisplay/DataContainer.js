import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function DataContainer({ item, isCurrentSeason }) {
  return (
    <View style={styles.dataContainer}>
      <Text style={styles.text}>Cijena: {item.price} €</Text>
      <Text style={styles.text}>Naručeno: {item.quantityOrdered}</Text>
      <Text style={styles.text}>
        Prodano:{" "}
        {isCurrentSeason
          ? item.quantitySold
          : (item.revenue / item.price).toFixed(0)}
      </Text>
      <Text style={styles.text}>Prihod: {item.revenue} €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  dataContainer: {
    width: "75%",
  },
});
