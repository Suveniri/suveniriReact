import React from "react";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { openCamera, openGallery } from "../../../../utils/helperFunctions";

export default function ModalCamera({ image, setImage }) {
  return (
    <View style={styles.cameraModalContainer}>
      <Text style={styles.imageText}>Nova slika:</Text>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.takePictureButton}
          onPress={() => openCamera(setImage)}
        >
          <Text style={styles.addImageText}>Kamera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.takePictureButton}
          onPress={() => openGallery(setImage)}
        >
          <Text style={styles.addImageText}>Galerija</Text>
        </TouchableOpacity>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 50, height: 50, margin: 5 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraModalContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  takePictureButton: {
    backgroundColor: "black",
    borderRadius: 5,
    width: 110,
    padding: 5,
    margin: 2,
  },
  addImageText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  imageText: {
    color: "black",
    fontSize: 20,
  },
});
