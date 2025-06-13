import React from "react";
import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import DataContainer from "./singleSouvenirDisplay/DataContainer";
import EditContainer from "./singleSouvenirDisplay/EditContainer";

export default function SingleSouvenirDisplay({
  item,
  areNumbersVisible,
  isCurrentSeason,
  setIsImageModalVisible,
  setSelectedImageSouvenir,
  setSelectedQuantitySouvenir,
  setIsQuantityModalVisible,
}) {
  return (
    <View style={styles.card}>
      {item.image_url && (
        <Pressable
          onPress={() => {
            setIsImageModalVisible(true);
            setSelectedImageSouvenir(item);
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
          <View style={styles.textContainer}>
            <DataContainer item={item} isCurrentSeason={isCurrentSeason} />
            {isCurrentSeason && (
              <EditContainer
                souvenir={item}
                setIsQuantityModalVisible={setIsQuantityModalVisible}
                setSelectedQuantitySouvenir={setSelectedQuantitySouvenir}
              />
            )}
          </View>
        </>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffffcc",
    borderRadius: 10,
    padding: 10,
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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    textAlign: "center",
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
  },
});
