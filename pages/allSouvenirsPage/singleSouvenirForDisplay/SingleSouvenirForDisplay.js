import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import DataForSingleSouvenir from "./DataForSIngleSouvenir";

export default function SingleSouvenirForDisplay({
  souvenir,
  areNumbersVisible,
  setShouldRefetchAllSouvneirs,
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
      <DataForSingleSouvenir
        souvenir={souvenir}
        areNumbersVisible={areNumbersVisible}
        setShouldRefetchAllSouvneirs={setShouldRefetchAllSouvneirs}
      />
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
});
