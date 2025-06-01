import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import SingleSouvenirForDisplay from "./singleSouvenirForDisplay/SingleSouvenirForDisplay";
import { supabase } from "../../config/supabase";

export default function AllSouvenirs() {
  const [allSouvenirs, setAllSouvenirs] = useState();

  useEffect(() => {
    async function fetchSouvenirs() {
      const { data, error } = await supabase.from("souvenirs").select("*");

      if (error) {
        console.error("Error fetching souvenirs:", error);
      } else {
        setAllSouvenirs(data);
      }
    }

    fetchSouvenirs();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/homeBackgroundImage.jpg")}
      style={styles.background}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>SVI SUVENIRI</Text>
        <ScrollView style={styles.souvenirsContainer}>
          {allSouvenirs?.map((souvenir, index) => {
            return <SingleSouvenirForDisplay key={index} souvenir={souvenir} />;
          })}
        </ScrollView>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>DODAJ NOVI SUVENIR</Text>
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
    height: "100%",
    width: "100%",
    alignItems: "center",
    marginTop: 30,
  },
  souvenirsContainer: {
    width: "95%",
    borderWidth: 2,
    borderColor: "black",
  },
  text: {
    fontSize: 24,
    height: "5%",
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 20,
    width: "80%",
    alignItems: "center",
    marginBottom: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
  },
});
