import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import SeasonTopScreen from "./currentSeasonTopScreen/SeasonTopScreen";
import { fetchSouvenirsForSingleSeason } from "../../api/db";

export default function CurrentSeason({ route }) {
  const { areNumbersVisible } = route.params;
  const [souvenirs, setSouvenirs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSouvenirsForSingleSeason(currentYear);
      setSouvenirs(data);

      const total = data.reduce(
        (sum, item) => sum + (parseFloat(item.revenue) || 0),
        0
      );
      setTotalRevenue(total);
    };

    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <SeasonTopScreen />
      {/* <Text style={styles.text}>{souvenirs[0].name}</Text> */}
      <Text style={styles.text}>Ukupno: {totalRevenue} €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: "30",
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});
