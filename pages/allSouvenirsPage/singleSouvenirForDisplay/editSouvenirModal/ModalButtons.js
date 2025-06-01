import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ModalButtons({ setIsModalVisible, newName, newPrice }) {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        onPress={() => setIsModalVisible(false)}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Zatvori</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={() => {
        //   console.log("new name: ", newName, " new price: ", newPrice);
        // }}
        style={styles.closeButton}
      >
        <Text style={styles.closeButtonText}>Spremi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    width: "40%",
    margin: "5%",
  },
  closeButtonText: {
    color: "white",
    fontSize: 24,
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
