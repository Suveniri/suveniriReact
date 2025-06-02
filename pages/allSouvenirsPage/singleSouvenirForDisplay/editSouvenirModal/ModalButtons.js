import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ModalButtons({
  setIsModalVisible,
  newName,
  newPrice,
  image,
  setImage,
  souvenir,
}) {
  const handleCloseButtonClick = () => {
    setIsModalVisible(false);
    setImage(null);
  };

  const handleSaveButtonClick = () => {
    console.log(
      "new name: ",
      newName,
      " new price: ",
      newPrice,
      "new image: ",
      image
    );
  };

  const handleDeleteButtonClick = () => {
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
