import React from "react";
import { View, StyleSheet, Image, Modal, Pressable } from "react-native";

export default function FullscreenImageModal({
  souvenir,
  setIsImageModalVisible,
  isImageModalVisible,
}) {
  return (
    <Modal
      visible={isImageModalVisible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.modalContainer}>
        <Pressable
          onPress={() => setIsImageModalVisible(false)}
          style={styles.fullscreenImage}
        >
          <Image
            source={{ uri: souvenir.imageUrl || souvenir.image_url }}
            style={styles.fullscreenImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
