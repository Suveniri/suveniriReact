import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import EditSouvenirModal from "./EditSouvenirModal";

export default function DataForSingleSouvenir({
  souvenir,
  areNumbersVisible,
  setShouldRefetchAllSouvneirs,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <View style={styles.dataContainer}>
      <Text style={styles.nameText}>{souvenir.name}</Text>
      <View
        style={
          areNumbersVisible
            ? styles.priceAndEditContainer
            : styles.editContainer
        }
      >
        {areNumbersVisible ? (
          <Text style={styles.priceText}>{souvenir.price} €</Text>
        ) : (
          <></>
        )}
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
        setShouldRefetchAllSouvneirs={setShouldRefetchAllSouvneirs}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  priceText: {
    height: "100%",
    width: "50%",
    fontSize: 20,
    textAlign: "center",
    marginBottom: "10%",
  },
  nameText: {
    height: "70%",
    fontSize: 20,
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
  editContainer: {
    width: "100%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 16,
  },
});
