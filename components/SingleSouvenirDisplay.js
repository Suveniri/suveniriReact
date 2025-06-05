import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import FullscreenImageModal from "./FullScreenImageModal";

export default function SingleSouvenirDisplay({ item, areNumbersVisible }) {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      {item.imageUrl && (
        <Pressable
          onPress={() => {
            setIsImageModalVisible(true);
          }}
          style={styles.image}
        >
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
      )}
      <Text style={styles.name}>{item.name}</Text>
      {areNumbersVisible ? (
        <>
          <Text style={styles.text}>
            Cijena: {areNumbersVisible ? `${item.price}` : "****"} €
          </Text>
          <Text style={styles.text}>Naručeno: {item.quantityOrdered}</Text>
          <Text style={styles.text}>Prodano: {item.quantitySold}</Text>
          <Text style={styles.text}>
            Prihod: {areNumbersVisible ? `${item.revenue}` : "****"} €
          </Text>
        </>
      ) : (
        <></>
      )}
      <FullscreenImageModal
        souvenir={item}
        setIsImageModalVisible={setIsImageModalVisible}
        isImageModalVisible={isImageModalVisible}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffaa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    minWidth: 300,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  text: {
    fontSize: 24,
  },
});
