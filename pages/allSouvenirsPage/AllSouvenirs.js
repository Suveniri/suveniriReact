import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
} from "react-native";
import SingleSouvenirForDisplay from "./singleSouvenirForDisplay/SingleSouvenirForDisplay";
import { fetchAllSouvenirs } from "../../api/db";
import EditSouvenirModal from "./singleSouvenirForDisplay/EditSouvenirModal";
import SearchBar from "../../components/SearchBar";
import { filterAndSortSouvenirs } from "../../utils/helperFunctions";
import FullscreenImageModal from "../../components/FullScreenImageModal";

export default function AllSouvenirs({ route }) {
  const { areNumbersVisible } = route.params;
  const [allSouvenirs, setAllSouvenirs] = useState([]);
  const [shouldRefetchAllSouvenirs, setShouldRefetchAllSouvneirs] =
    useState(false);
  const [isNewSouvenirModalVisible, setIsNewSouvenirModalVisible] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImageSouvenir, setSelectedImageSouvenir] = useState(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);

  useEffect(() => {
    async function loadSouvenirs() {
      const data = await fetchAllSouvenirs();
      setAllSouvenirs(data);
    }

    loadSouvenirs();
  }, [shouldRefetchAllSouvenirs]);

  const filteredSouvenirs = filterAndSortSouvenirs(allSouvenirs, searchTerm);

  return (
    <ImageBackground
      source={require("../../assets/homeBackgroundImage.jpg")}
      style={styles.background}
      imageStyle={{ opacity: 0.6 }}
    >
      <View style={styles.container}>
        <Text style={styles.text}>SVI SUVENIRI</Text>

        <SearchBar value={searchTerm} onChangeText={setSearchTerm} />

        <FlatList
          data={filteredSouvenirs}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <SingleSouvenirForDisplay
              souvenir={item}
              areNumbersVisible={areNumbersVisible}
              setShouldRefetchAllSouvneirs={setShouldRefetchAllSouvneirs}
              setSelectedImageSouvenir={setSelectedImageSouvenir}
              setIsImageModalVisible={setIsImageModalVisible}
            />
          )}
          contentContainerStyle={styles.souvenirsContainer}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsNewSouvenirModalVisible(true)}
        >
          <Text style={styles.buttonText}>DODAJ NOVI SUVENIR</Text>
        </TouchableOpacity>
        <EditSouvenirModal
          setIsNewSouvenirModalVisible={setIsNewSouvenirModalVisible}
          isNewSouvenirModalVisible={isNewSouvenirModalVisible}
          setShouldRefetchAllSouvneirs={setShouldRefetchAllSouvneirs}
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
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },
  souvenirsContainer: {
    width: "95%",
    borderWidth: 2,
    borderColor: "black",
  },
  text: {
    fontSize: 26,
    height: "5%",
    fontWeight: "bold",
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
    fontSize: 18,
  },
});
