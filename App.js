import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/homePage/Home";
import AllSouvenirs from "./pages/allSouvenirsPage/AllSouvenirs";
import CurrentSeason from "./pages/currentSeasonPage/CurrentSeason";
import PreviousSeason from "./pages/previousSeasonPage/PreviousSeasons.js";

const Stack = createNativeStackNavigator();
import "react-native-url-polyfill/auto";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CurrentSeason" component={CurrentSeason} />
        <Stack.Screen name="PreviousSeason" component={PreviousSeason} />
        <Stack.Screen name="AllSouvenirs" component={AllSouvenirs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
