import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { saveSouvenirChanges } from "../../../../api/db";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function ModalButtons({
  setIsModalVisible,
  newName,
  newPrice,
  image,
  setImage,
  souvenir,
  setShouldRefetchAllSouvneirs,
}) {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const handleCloseButtonClick = () => {
    setIsModalVisible(false);
    setImage(null);
  };

  const handleSaveButtonClick = () => {
    saveSouvenirChanges(souvenir, newName, newPrice, image);
    setShouldRefetchAllSouvneirs((prev) => !prev);
    setIsModalVisible(false);
  };

  const handleDeleteButtonClick = () => {
    setIsConfirmModalVisible(true);
    setImage(null);
  };

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        onPress={() => handleCloseButtonClick()}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Zatvori</Text>
      </TouchableOpacity>
      <View style={styles.saveDeleteButtonsContainer}>
        <TouchableOpacity
          onPress={() => handleSaveButtonClick()}
          style={[styles.closeButton, styles.saveButton]}
        >
          <Text style={styles.closeButtonText}>Spremi</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.closeButton, styles.deleteButton]}
          onPress={() => handleDeleteButtonClick()}
        >
          <Text style={styles.closeButtonText}>Izbriši</Text>
        </TouchableOpacity>
      </View>
      <ConfirmModal
        isConfirmModalVisible={isConfirmModalVisible}
        setIsConfirmModalVisible={setIsConfirmModalVisible}
        souvenir={souvenir}
        setIsModalVisible={setIsModalVisible}
        setShouldRefetchAllSouvneirs={setShouldRefetchAllSouvneirs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: "black",
    padding: 5,
    borderRadius: 5,
    width: 100,
    margin: "1%",
  },
  deleteButton: {
    backgroundColor: "darkred",
  },
  saveButton: {
    backgroundColor: "darkgreen",
  },
  closeButtonText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  saveDeleteButtonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
