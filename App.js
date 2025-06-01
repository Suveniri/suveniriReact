import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import "react-native-url-polyfill/auto";
import { supabase } from "./config/supabase";

export default function App() {
  const [souvenirs, setSouvenirs] = useState([]);

  useEffect(() => {
    async function fetchSouvenirs() {
      const { data, error } = await supabase.from("souvenirs").select("*");

      if (error) {
        console.error("Error fetching souvenirs:", error);
      } else {
        setSouvenirs(data);
      }
    }

    fetchSouvenirs();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {souvenirs.map((s) => (
        <Text key={s.id}>
          {s.name} - ${s.price}
        </Text>
      ))}
    </View>
  );
}
