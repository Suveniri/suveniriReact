import React, { useEffect, useMemo, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  View,
  FlatList,
  Switch,
  Text,
} from "react-native";
import {
  fetchSouvenirsForSingleSeason,
  initializeSouvenirsForCurrentYear,
} from "../../api/db";
import SearchBar from "../../components/SearchBar";
import SingleSouvenirDisplay from "../../components/SingleSouvenirDisplay";
import SeasonTopScreen from "./currentSeasonTopScreen/SeasonTopScreen";
import { filterAndSortSouvenirs } from "../../utils/helperFunctions";
import FullscreenImageModal from "../../components/FullScreenImageModal";
import EditQuantityModal from "../../components/singleSouvenirDisplay/EditQuantityModal";

export default function CurrentSeason({ route }) {
  const { areNumbersVisible } = route.params;
  const [souvenirs, setSouvenirs] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrderedValue, setTotalOrderedValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [shouldRefetchAllSouvenirs, setShouldRefetchAllSouvneirs] =
    useState(false);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false);
  const [selectedImageSouvenir, setSelectedImageSouvenir] = useState(null);
  const [selectedQuantitySouvenir, setSelectedQuantitySouvenir] =
    useState(null);
  const [showOnlyWithRevenue, setShowOnlyWithRevenue] = useState(false);

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

  const filteredSouvenirs = useMemo(() => {
    let souvenirsToFilter = souvenirs;
    if (showOnlyWithRevenue) {
      souvenirsToFilter = souvenirsToFilter.filter(
        (s) => (parseFloat(s.revenue) || 0) !== 0
      );
    }

    return filterAndSortSouvenirs(souvenirsToFilter, searchTerm);
  }, [souvenirs, searchTerm, showOnlyWithRevenue]);

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

        <View style={styles.filterContainer}>
          <Text style={styles.filterText}>Prikaži samo prodane</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#add8e6" }}
            thumbColor={showOnlyWithRevenue ? "#87cefa" : "#f8f8ff"}
            onValueChange={setShowOnlyWithRevenue}
            value={showOnlyWithRevenue}
          />
        </View>

        <FlatList
          data={filteredSouvenirs}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <SingleSouvenirDisplay
              item={item}
              areNumbersVisible={areNumbersVisible}
              isCurrentSeason={true}
              setIsImageModalVisible={setIsImageModalVisible}
              setSelectedImageSouvenir={setSelectedImageSouvenir}
              setSelectedQuantitySouvenir={setSelectedQuantitySouvenir}
              setIsQuantityModalVisible={setIsQuantityModalVisible}
            />
          )}
          contentContainerStyle={styles.souvenirsContainer}
        />
      </View>
      {selectedImageSouvenir && (
        <FullscreenImageModal
          souvenir={selectedImageSouvenir}
          setIsImageModalVisible={setIsImageModalVisible}
          isImageModalVisible={isImageModalVisible}
          setSelectedImageSouvenir={setSelectedImageSouvenir}
        />
      )}

      {selectedQuantitySouvenir && (
        <EditQuantityModal
          souvenir={selectedQuantitySouvenir}
          setIsQuantityModalVisible={setIsQuantityModalVisible}
          isQuantityModalVisible={isQuantityModalVisible}
          setShouldRefetchAllSouvneirs={setShouldRefetchAllSouvneirs}
          setSelectedQuantitySouvenir={setSelectedQuantitySouvenir}
        />
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
  },
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
    fontSize: 20,
  },
  souvenirsContainer: {
    width: "75%",
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "75%",
    marginVertical: 10,
    transform: [{ scale: 1.2 }],
  },
  filterText: {
    marginRight: 10,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
