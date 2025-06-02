import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { fetchSouvenirsForSingleSeason } from "../../api/db";

export default function PreviousSeasonDetails({ route }) {
  const { year, areNumbersVisible } = route.params;
  const [souvenirs, setSouvenirs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchSouvenirsForSingleSeason(year);
      setSouvenirs(data);

      const total = data.reduce(
        (sum, item) => sum + (parseFloat(item.revenue) || 0),
        0
      );
      setTotalRevenue(total);
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
        <Text style={styles.title}>Podaci za sezonu {year}</Text>

        <FlatList
          data={souvenirs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item.imageUrl && (
                <Image source={{ uri: item.imageUrl }} style={styles.image} />
              )}
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.text}>
                Cijena: {areNumbersVisible ? `${item.price}` : "****"} €
              </Text>
              <Text style={styles.text}>Naručeno: {item.quantityOrdered}</Text>
              <Text style={styles.text}>Prodano: {item.quantitySold}</Text>
              <Text style={styles.text}>
                Prihod: {areNumbersVisible ? `${item.revenue}` : "****"} €
              </Text>
            </View>
          )}
          ListFooterComponent={
            <View style={styles.footer}>
              <Text style={styles.totalText}>
                Ukupno:{" "}
                {areNumbersVisible ? `${totalRevenue.toFixed(2)}` : "****"} €
              </Text>
            </View>
          }
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
    width: "100%",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 100,
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
  card: {
    backgroundColor: "#ffffffaa",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  text: {
    fontSize: 24,
  },
  totalText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
});
