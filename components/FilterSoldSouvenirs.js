import React from "react";
import { View, Switch, StyleSheet } from "react-native";

export default function FilterSoldSouvenirs({ isFiltering, onToggle }) {
  return (
    <View style={styles.container}>
      <Switch
        style={styles.switch}
        trackColor={{ false: "#333", true: "#ccc" }}
        thumbColor={isFiltering ? "#fff" : "#555"}
        ios_backgroundColor="#ccc"
        onValueChange={onToggle}
        value={isFiltering}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  switch: {
    transform: [{ scale: 1.3 }],
  },
});
