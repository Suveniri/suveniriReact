import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { updateSelledOrderedQuantities, updateRevenue } from "../../api/db";

export default function QuantityModalButton({
  souvenir,
  setIsQuantityModalVisible,
  setNewOrderQuantity,
  setNewSelledQuantity,
  newOrderQuantity,
  newSelledQuantity,
  isPlusOrder,
  isPlusSelled,
  setShouldRefetchAllSouvneirs,
}) {
  const handleSaveQuantityChanges = async () => {
    await updateSelledOrderedQuantities(
      souvenir,
      isPlusOrder,
      isPlusSelled,
      newOrderQuantity,
      newSelledQuantity
    );

    await updateRevenue({
      ...souvenir,
      quantitySold: isPlusSelled
        ? Number(souvenir.quantitySold) + Number(newSelledQuantity)
        : Number(souvenir.quantitySold) - Number(newSelledQuantity),
    });

    setIsQuantityModalVisible(false);
    setNewOrderQuantity(0);
    setNewSelledQuantity(0);
    setShouldRefetchAllSouvneirs((prev) => !prev);
  };

  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={styles.buttonSave}
        onPress={handleSaveQuantityChanges}
      >
        <Text style={styles.buttonText}>Spremi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonCancel}
        onPress={() => {
          setIsQuantityModalVisible(false);
          setNewOrderQuantity(0);
          setNewSelledQuantity(0);
        }}
      >
        <Text style={styles.buttonText}>Poništi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "darkblue",
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
