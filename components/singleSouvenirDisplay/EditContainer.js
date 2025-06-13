import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default function EditContainer({
  souvenir,
  setIsQuantityModalVisible,
  setSelectedQuantitySouvenir,
}) {
  return (
    <View style={styles.editButtonContainer}>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          setIsQuantityModalVisible((prev) => !prev);
          setSelectedQuantitySouvenir(souvenir);
        }}
      >
        <Text style={styles.buttonText}>UREDI</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  editButtonContainer: {
    width: "25%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editButton: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "darkgray",
  },
  buttonText: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});
