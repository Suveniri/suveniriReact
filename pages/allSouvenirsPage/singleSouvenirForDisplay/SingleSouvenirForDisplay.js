import React from "react";
import { View, StyleSheet, Image, Modal, Pressable } from "react-native";
import DataForSingleSouvenir from "./DataForSIngleSouvenir";

export default function SingleSouvenirForDisplay({
  souvenir,
  areNumbersVisible,
  setShouldRefetchAllSouvneirs,
  setSelectedImageSouvenir,
  setIsImageModalVisible,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Pressable
          onPress={() => {
            setIsImageModalVisible(true);
            setSelectedImageSouvenir(souvenir);
          }}
          style={styles.image}
        >
          <Image
            source={{ uri: `${souvenir.image_url}` }}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
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
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "90%",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullscreenImage: {
    width: "100%",
    height: "100%",
  },
});
