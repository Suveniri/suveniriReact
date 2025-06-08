import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createNewSouvenir, saveSouvenirChanges } from "../../../../api/db";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function ModalButtons({
  setIsModalVisible,
  setIsNewSouvenirModalVisible,
  setNewName,
  newName,
  setNewPrice,
  newPrice,
  image,
  setImage,
  souvenir,
  setShouldRefetchAllSouvneirs,
}) {
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

  const handleCloseButtonClick = () => {
    souvenir ? setIsModalVisible(false) : setIsNewSouvenirModalVisible(false);
    setImage(null);
    setNewPrice(null);
    setNewName(null);
  };

  const handleSaveButtonClick = async () => {
    if (souvenir) await saveSouvenirChanges(souvenir, newName, newPrice, image);
    else await createNewSouvenir(newName, newPrice, image);
    setShouldRefetchAllSouvneirs((prev) => !prev);
    souvenir ? setIsModalVisible(false) : setIsNewSouvenirModalVisible(false);
    setImage(null);
    setNewPrice(null);
    setNewName(null);
  };

  const handleDeleteButtonClick = () => {
    setIsConfirmModalVisible(true);
    setImage(null);
    setNewPrice(null);
    setNewName(null);
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
        {souvenir && (
          <TouchableOpacity
            style={[styles.closeButton, styles.deleteButton]}
            onPress={() => handleDeleteButtonClick()}
          >
            <Text style={styles.closeButtonText}>Izbriši</Text>
          </TouchableOpacity>
        )}
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
    fontSize: 20,
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
