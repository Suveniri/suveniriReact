import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Keyboard,
} from "react-native";
import ModalButtons from "./editSouvenirModal/ModalButtons";
import ModalInputs from "./editSouvenirModal/ModalInputs";

export default function EditSouvenirModal({
  souvenir,
  setIsModalVisible,
  isModalVisible,
}) {
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
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
      visible={isModalVisible}
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
          <ModalButtons
            setIsModalVisible={setIsModalVisible}
            newName={newName}
            newPrice={newPrice}
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
    justifyContent: "center",
  },
  modalContentWithKeyboard: {
    height: "80%",
  },
});
