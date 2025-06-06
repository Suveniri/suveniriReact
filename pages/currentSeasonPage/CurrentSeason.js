import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import {
  fetchSouvenirsForSingleSeason,
  initializeSouvenirsForCurrentYear,
} from "../../api/db";
import SearchBar from "../../components/SearchBar";
import SingleSouvenirDisplay from "../../components/SingleSouvenirDisplay";
import SeasonTopScreen from "./currentSeasonTopScreen/SeasonTopScreen";

export default function CurrentSeason({ route }) {
  const { areNumbersVisible } = route.params;
  const [souvenirs, setSouvenirs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrderedValue, setTotalOrderedValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const loadData = async () => {
      await initializeSouvenirsForCurrentYear();
      const data = await fetchSouvenirsForSingleSeason(currentYear);
      setSouvenirs(data);

      const total = data.reduce(
        (sum, item) => sum + (parseFloat(item.revenue) || 0),
        0
      );
      setTotalRevenue(total);

      const totalOrderedValue = data.reduce(
        (sum, item) => sum + (item.quantityOrdered || 0) * (item.price || 0),
        0
      );
      setTotalOrderedValue(totalOrderedValue);
    };

    loadData();
  }, []);

  const filteredSouvenirs = souvenirs.filter((item) =>
    item.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ImageBackground
      source={require("../../assets/homeBackgroundImage.jpg")}
      style={styles.background}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.container}>
        <SeasonTopScreen
          selectedYear={currentYear}
          areNumbersVisible={areNumbersVisible}
          totalRevenue={totalRevenue}
          totalOrderedValue={totalOrderedValue}
        />

        <SearchBar value={searchTerm} onChangeText={setSearchTerm} />

        <ScrollView style={styles.souvenirsContainer}>
          {filteredSouvenirs.map((souvenir, index) => (
            <SingleSouvenirDisplay
              key={index}
              item={souvenir}
              areNumbersVisible={areNumbersVisible}
            />
          ))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 40,
    width: "100%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
  },
  text: {
    fontSize: 24,
  },
  souvenirsContainer: {
    width: "75%",
  },
});
