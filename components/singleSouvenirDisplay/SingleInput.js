import React from "react";
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Text,
} from "react-native";

export default function SingleInput({ title, setNumber, setIsPlus, isPlus }) {
  return (
    <>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => {
            const parsed = parseInt(text, 10);
            if (!isNaN(parsed)) {
              setNumber(parsed);
            } else {
              setNumber(0);
            }
          }}
        />
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isPlus ? "green" : "red" }]}
          onPress={() => setIsPlus((prev) => !prev)}
        >
          <Text style={[styles.text, { color: "white" }]}>
            {isPlus ? "Dodaj" : "Oduzmi"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 100,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
  button: {
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "gray",
  },
});
