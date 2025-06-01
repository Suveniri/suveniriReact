import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import EditSouvenirModal from "./EditSouvenirModal";

export default function DataForSingleSouvenir({ souvenir, areNumbersVisible }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.dataContainer}>
      <Text style={styles.nameText}>{souvenir.name}</Text>
      <View style={styles.priceAndEditContainer}>
        <Text style={styles.priceText}>
          {areNumbersVisible ? `${souvenir.price} €` : "**** €"}
        </Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsModalVisible(true)}
        >
          <Text style={styles.buttonText}>UREDI</Text>
        </TouchableOpacity>
      </View>
      <EditSouvenirModal
        souvenir={souvenir}
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  priceText: {
    height: "100%",
    width: "50%",
    fontSize: 24,
    textAlign: "center",
    marginBottom: "10%",
  },
  nameText: {
    height: "70%",
    fontSize: 24,
    textAlign: "center",
    textAlignVertical: "center",
  },
  dataContainer: {
    width: "50%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  priceAndEditContainer: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    width: "40%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 5,
    backgroundColor: "darkgray",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
