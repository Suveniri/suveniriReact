import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { fetchSouvenirsForSingleSeason } from "../../api/db";
import SingleSouvenirDisplay from "../../components/SingleSouvenirDisplay";
import SeasonTopScreen from "../currentSeasonPage/currentSeasonTopScreen/SeasonTopScreen";

export default function PreviousSeasonDetails({ route }) {
  const { year, areNumbersVisible } = route.params;
  const [souvenirs, setSouvenirs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrderedValue, setTotalOrderedValue] = useState(0);

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

        <ScrollView style={styles.souvenirsContainer}>
          {souvenirs.map((souvenir, index) => (
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
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    display: "flex",
    marginTop: "30",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  souvenirsContainer: {
    width: "95%",
    borderWidth: 2,
    borderColor: "black",
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
  totalText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
});
