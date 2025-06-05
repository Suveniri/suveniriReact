import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function Home({ navigation }) {
  const [areNumbersVisible, setAreNumbersVisible] = useState(true);

  const handleToggle = () => {
    setAreNumbersVisible((prev) => !prev);
  };

  return (
    <ImageBackground
      source={require("../../assets/homeBackgroundImage.jpg")}
      style={styles.background}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Dobrodošao nazad, Jurice!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("CurrentSeason", { areNumbersVisible })
          }
        >
          <Text style={styles.buttonText}>Ova godina</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("PreviousSeason", { areNumbersVisible })
          }
        >
          <Text style={styles.buttonText}>Prošle godine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("AllSouvenirs", { areNumbersVisible })
          }
        >
          <Text style={styles.buttonText}>Svi suveniri</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.toggleButton} onPress={handleToggle}>
        <Text style={styles.toggleText}>
          {areNumbersVisible ? "SAKRIJ" : "PRIKAŽI"}
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 40,
    color: "#000",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
  },
  toggleButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: 120,
  },
  toggleText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
});
