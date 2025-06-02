import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { supabase } from "../../config/supabase";

export default function PreviousSeason() {
  const [seasons, setSeasons] = useState([]);

  const handleSeasonPress = (year) => {
    navigation.navigate("SeasonDetails", { year });
  };

  const fetchSeasons = async () => {
    const { data, error } = await supabase
      .from("souvenir_yearly_data")
      .select("year")
      .order("year", { ascending: false });

    if (error) {
      console.error("Error fetching seasons:", error);
      return [];
    }

    const currentYear = new Date().getFullYear();

    const uniqueYears = [...new Set(data.map((item) => item.year))].filter(
      (year) => year < currentYear
    );
    return uniqueYears;
  };

  useEffect(() => {
    const loadSeasons = async () => {
      const years = await fetchSeasons();
      setSeasons(years);
    };

    loadSeasons();
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/homeBackgroundImage.jpg")}
      style={styles.background}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Izaberi godinu</Text>
        <FlatList
          data={seasons}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSeasonPress(item)}
            >
              <Text style={styles.buttonText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
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
});
