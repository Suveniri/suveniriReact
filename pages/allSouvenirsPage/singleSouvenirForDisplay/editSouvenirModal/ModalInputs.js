import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
export default function ModalInputs({ souvenir, setNewName, setNewPrice }) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.modalText}>IME: {souvenir.name}</Text>
      <Text style={styles.modalText}>CIJENA: {souvenir.price} €</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewName}
        placeholder="Novo ime"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNewPrice}
        placeholder="Nova cijena"
        keyboardType="numeric"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
