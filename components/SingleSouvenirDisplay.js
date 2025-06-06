import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import FullscreenImageModal from "./FullScreenImageModal";

export default function SingleSouvenirDisplay({ item, areNumbersVisible }) {
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  return (
    <View style={styles.card}>
      {item.image_url && (
        <Pressable
          onPress={() => {
            setIsImageModalVisible(true);
          }}
          style={styles.image}
        >
          <Image
            source={{ uri: item.image_url }}
            style={styles.image}
            resizeMode="contain"
          />
        </Pressable>
      )}
      <Text style={styles.name}>{item.name}</Text>
      {areNumbersVisible ? (
        <>
          <Text style={styles.text}>Cijena: {item.price} €</Text>
          <Text style={styles.text}>Naručeno: {item.quantityOrdered}</Text>
          <Text style={styles.text}>
            Prodano: {(item.revenue / item.price).toFixed(0)}
          </Text>
          <Text style={styles.text}>Prihod: {item.revenue} €</Text>
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
    backgroundColor: "#ffffffcc",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    minWidth: 250,
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
