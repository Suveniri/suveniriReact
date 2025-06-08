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
  setIsPlusOrder,
  isPlusSelled,
  setIsPlusSelled,
  setShouldRefetchAllSouvneirs,
}) {
  const handleSaveQuantityChanges = async () => {
    if (newOrderQuantity === 0 && newSelledQuantity === 0) return;

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
    setIsPlusOrder(true);
    setIsPlusSelled(true);
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
          setIsPlusOrder(true);
          setIsPlusSelled(true);
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
    fontSize: 20,
    textAlign: "center",
  },
});
