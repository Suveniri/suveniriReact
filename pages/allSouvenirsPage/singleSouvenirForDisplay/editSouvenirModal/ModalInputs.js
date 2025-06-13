import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
export default function ModalInputs({ souvenir, setNewName, setNewPrice }) {
  return (
    <View style={styles.inputContainer}>
      {souvenir ? (
        <>
          <Text style={styles.modalText}>IME: {souvenir.name}</Text>
          <Text style={styles.modalText}>CIJENA: {souvenir.price} €</Text>
        </>
      ) : (
        <Text style={styles.modalText}>NOVI SUVENIR</Text>
      )}

      <TextInput
        style={styles.input}
        onChangeText={setNewName}
        placeholder="Novo ime"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNewPrice}
        placeholder="Nova cijena"
        placeholderTextColor="#888"
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
    marginBottom: -10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    color: "black",
    backgroundColor: "white",
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
