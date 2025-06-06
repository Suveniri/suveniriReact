import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Modal, Keyboard } from "react-native";
import QuantityModalButton from "./QuantityModalButton";
import SingleInput from "./SingleInput";

export default function EditQuantityModal({
  souvenir,
  setIsQuantityModalVisible,
  isQuantityModalVisible,
  setShouldRefetchAllSouvneirs,
}) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [newOrderQuantity, setNewOrderQuantity] = useState(0);
  const [newSelledQuantity, setNewSelledQuantity] = useState(0);
  const [isPlusOrder, setIsPlusOrder] = useState(true);
  const [isPlusSelled, setIsPlusSelled] = useState(true);

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
      visible={isQuantityModalVisible}
      animationType="slide"
      onRequestClose={() => setIsQuantityModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContent,
            isKeyboardVisible && styles.modalContentWithKeyboard,
          ]}
        >
          <Text style={styles.text}>UREDI KOLIČINE ZA {souvenir.name}</Text>

          <SingleInput
            title={"DODAJ KOLIČINU NARUDŽBE: "}
            setNumber={setNewOrderQuantity}
            setIsPlus={setIsPlusOrder}
            isPlus={isPlusOrder}
          />
          <SingleInput
            title={"DODAJ KOLIČINU PRODANIH: "}
            setNumber={setNewSelledQuantity}
            setIsPlus={setIsPlusSelled}
            isPlus={isPlusSelled}
          />
          <QuantityModalButton
            souvenir={souvenir}
            setIsQuantityModalVisible={setIsQuantityModalVisible}
            setNewOrderQuantity={setNewOrderQuantity}
            setNewSelledQuantity={setNewSelledQuantity}
            newOrderQuantity={newOrderQuantity}
            newSelledQuantity={newSelledQuantity}
            isPlusOrder={isPlusOrder}
            isPlusSelled={isPlusSelled}
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
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
  buttonSave: {
    backgroundColor: "darkgreen",
    marginRight: "2%",
    width: "40%",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
  },
  buttonCancel: {
    backgroundColor: "gray",
    marginLeft: "2%",
    width: "40%",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "black",
  },
  buttonText: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
  },
});
