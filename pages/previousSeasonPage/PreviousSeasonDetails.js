import React, { useEffect, useState } from "react";
import { ImageBackground, FlatList, StyleSheet, View } from "react-native";
import { fetchSouvenirsForSingleSeason } from "../../api/db";
import SearchBar from "../../components/SearchBar";
import SingleSouvenirDisplay from "../../components/SingleSouvenirDisplay";
import SeasonTopScreen from "../currentSeasonPage/currentSeasonTopScreen/SeasonTopScreen";
import { filterAndSortSouvenirs } from "../../utils/helperFunctions";
import FullscreenImageModal from "../../components/FullScreenImageModal";

export default function PreviousSeasonDetails({ route }) {
  const { year, areNumbersVisible } = route.params;
  const [souvenirs, setSouvenirs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrderedValue, setTotalOrderedValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImageSouvenir, setSelectedImageSouvenir] = useState(null);

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

  const filteredSouvenirs = filterAndSortSouvenirs(souvenirs, searchTerm);

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

        <FlatList
          data={filteredSouvenirs}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <SingleSouvenirDisplay
              item={item}
              areNumbersVisible={areNumbersVisible}
              isCurrentSeason={false}
              setIsImageModalVisible={setIsImageModalVisible}
              setSelectedImageSouvenir={setSelectedImageSouvenir}
            />
          )}
          contentContainerStyle={styles.souvenirsContainer}
        />
        {selectedImageSouvenir && (
          <FullscreenImageModal
            souvenir={selectedImageSouvenir}
            setIsImageModalVisible={setIsImageModalVisible}
            isImageModalVisible={isImageModalVisible}
            setSelectedImageSouvenir={setSelectedImageSouvenir}
          />
        )}
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
