import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SingleSouvenirForDisplay({
  souvenir,
  areNumbersVisible,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `${souvenir.image_url}` }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.dataContainer}>
        <Text style={styles.nameText}>{souvenir.name}</Text>
        <Text style={styles.priceText}>
          {areNumbersVisible ? `${souvenir.price} €` : "****"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 1 / 0.5,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "black",
    display: "flex",
    flexDirection: "row",
  },
  priceText: {
    height: "20%",
    fontSize: 24,
    textAlign: "center",
    marginBottom: "10%",
  },
  nameText: {
    height: "80%",
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
  },
  imageContainer: {
    width: "50%",
    height: "100%",
    borderWidth: 1,
    borderColor: "black",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  dataContainer: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
});
