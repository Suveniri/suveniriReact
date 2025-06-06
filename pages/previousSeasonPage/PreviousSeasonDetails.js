import React, { useEffect, useState } from "react";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { fetchSouvenirsForSingleSeason } from "../../api/db";
import SearchBar from "../../components/SearchBar";
import SingleSouvenirDisplay from "../../components/SingleSouvenirDisplay";
import SeasonTopScreen from "../currentSeasonPage/currentSeasonTopScreen/SeasonTopScreen";

export default function PreviousSeasonDetails({ route }) {
  const { year, areNumbersVisible } = route.params;
  const [souvenirs, setSouvenirs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrderedValue, setTotalOrderedValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSouvenirsForSingleSeason(year);
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
  }, [year]);

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
          selectedYear={year}
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
              isCurrentSeason={false}
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
  souvenirsContainer: {
    width: "75%",
  },
});
