import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import "react-native-url-polyfill/auto";
import AllSouvenirs from "./pages/allSouvenirsPage/AllSouvenirs";
import CurrentSeason from "./pages/currentSeasonPage/CurrentSeason";
import Home from "./pages/homePage/Home";
import PreviousSeasonDetails from "./pages/previousSeasonPage/PreviousSeasonDetails";
import PreviousSeason from "./pages/previousSeasonPage/PreviousSeasonsSubmenu.js";

const Stack = createNativeStackNavigator();

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
        <Stack.Screen
          name="PreviousSeasonDetails"
          component={PreviousSeasonDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
