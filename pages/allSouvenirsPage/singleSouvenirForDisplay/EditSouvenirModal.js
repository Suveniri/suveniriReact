import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Keyboard } from "react-native";
import ModalButtons from "./editSouvenirModal/ModalButtons";
import ModalInputs from "./editSouvenirModal/ModalInputs";
import ModalCamera from "./editSouvenirModal/ModalCamera";

export default function EditSouvenirModal({
  souvenir,
  setIsModalVisible,
  isModalVisible,
  setShouldRefetchAllSouvneirs,
  setIsNewSouvenirModalVisible,
  isNewSouvenirModalVisible,
}) {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [image, setImage] = useState(null);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Modal
      transparent={true}
      visible={souvenir ? isModalVisible : isNewSouvenirModalVisible}
      animationType="slide"
      onRequestClose={() => setIsModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            isKeyboardVisible && styles.modalContentWithKeyboard,
          ]}
        >
          <ModalInputs
            souvenir={souvenir}
            setNewName={setNewName}
            setNewPrice={setNewPrice}
          />
          <ModalCamera image={image} setImage={setImage} />
          <ModalButtons
            setIsModalVisible={setIsModalVisible}
            setIsNewSouvenirModalVisible={setIsNewSouvenirModalVisible}
            setNewName={setNewName}
            newName={newName}
            setNewPrice={setNewPrice}
            newPrice={newPrice}
            image={image}
            setImage={setImage}
            souvenir={souvenir}
            setShouldRefetchAllSouvneirs={setShouldRefetchAllSouvneirs}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    height: "60%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalContentWithKeyboard: {
    height: "100%",
    width: "100%",
  },
});
