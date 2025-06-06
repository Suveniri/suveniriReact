import React, { useRef, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Easing,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchBar({ value, onChangeText }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedWidth = useRef(new Animated.Value(50)).current;
  const inputOpacity = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    if (isExpanded) {
      Animated.parallel([
        Animated.timing(animatedWidth, {
          toValue: 50,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.circle),
        }),
        Animated.timing(inputOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => setIsExpanded(false));
    } else {
      setIsExpanded(true);
      Animated.parallel([
        Animated.timing(animatedWidth, {
          toValue: 300,
          duration: 300,
          useNativeDriver: false,
          easing: Easing.out(Easing.circle),
        }),
        Animated.timing(inputOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.searchWrapper, { width: animatedWidth }]}>
        <TouchableOpacity onPress={toggleExpand} style={styles.iconWrapper}>
          <Ionicons name="search" size={24} color="#333" />
        </TouchableOpacity>
        {isExpanded && (
          <Animated.View
            style={[styles.inputWrapper, { opacity: inputOpacity }]}
          >
            <TextInput
              style={styles.input}
              placeholder="Pretraži"
              value={value}
              onChangeText={onChangeText}
              autoFocus
            />
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 5,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  iconWrapper: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});
