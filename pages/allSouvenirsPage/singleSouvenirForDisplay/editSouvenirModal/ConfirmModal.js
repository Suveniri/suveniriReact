import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { deleteSouvenir } from "../../../../api/db";

export default function ConfirmModal({
  isConfirmModalVisible,
  setIsConfirmModalVisible,
  souvenir,
  setIsModalVisible,
  setShouldRefetchAllSouvneirs,
}) {
  const handleConfirmButtonClick = async () => {
    setIsConfirmModalVisible(false);
    await deleteSouvenir(souvenir);
    setIsModalVisible(false);
    setShouldRefetchAllSouvneirs((prev) => !prev);
  };

  return (
    <Modal
      transparent={true}
      visible={isConfirmModalVisible}
      animationType="fade"
      onRequestClose={() => setIsConfirmModalVisible(false)}
    >
      <View style={styles.confirmModalOverlay}>
        <View style={styles.confirmModalContent}>
          <Text style={styles.modalText}>
            Jesi siguran da želiš izbrisati suvenir?
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => handleConfirmButtonClick()}
            >
              <Text style={styles.buttonText}>Da</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quitButton}
              onPress={() => {
                setIsConfirmModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Ne</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  confirmModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmModalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "darkred",
    padding: 5,
    borderRadius: 5,
    width: 100,
    margin: "1%",
  },
  quitButton: {
    backgroundColor: "darkblue",
    padding: 5,
    borderRadius: 5,
    width: 100,
    margin: "1%",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 22,
    color: "white",
  },
  modalText: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
});
