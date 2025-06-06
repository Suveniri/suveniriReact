import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";
import SeasonTopScreen from "./currentSeasonTopScreen/SeasonTopScreen";
import {
  fetchSouvenirsForSingleSeason,
  initializeSouvenirsForCurrentYear,
} from "../../api/db";
import SingleSouvenirDisplay from "../../components/SingleSouvenirDisplay";

export default function CurrentSeason({ route }) {
  const { areNumbersVisible } = route.params;
  const [souvenirs, setSouvenirs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrderedValue, setTotalOrderedValue] = useState(0);
  const [shouldRefetchAllSouvenirs, setShouldRefetchAllSouvneirs] =
    useState(false);

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
  }, [shouldRefetchAllSouvenirs]);

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

        <ScrollView style={styles.souvenirsContainer}>
          {souvenirs.map((souvenir, index) => (
            <SingleSouvenirDisplay
              key={index}
              item={souvenir}
              areNumbersVisible={areNumbersVisible}
              isCurrentSeason={true}
              setShouldRefetchAllSouvneirs={setShouldRefetchAllSouvneirs}
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
    marginTop: "30",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 120,
  },
  text: {
    fontSize: 24,
  },
  souvenirsContainer: {
    width: "95%",
    borderWidth: 2,
    borderColor: "black",
  },
});
