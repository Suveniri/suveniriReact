import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

export default function Home({ navigation }) {
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
          onPress={() => navigation.navigate("CurrentSeason")}
        >
          <Text style={styles.buttonText}>Ova godina</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("PreviousSeason")}
        >
          <Text style={styles.buttonText}>Prošle godine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AllSouvenirs")}
        >
          <Text style={styles.buttonText}>Svi suveniri</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#fff",
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
});
