import { View, Text, Platform, TouchableOpacity } from "react-native";
import React from "react";
import styles from "@/assets/styles/modal.styles";
import { Link, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";


export default function Modal() {
  const isPresented = router.canGoBack();
  const {logout, type, title, content} = useLocalSearchParams()

  const handel = () => {
    isPresented && router.push("../");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal screen</Text>
      {isPresented && <Link href="../">Dismiss modal</Link>}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
      <View>
        <TouchableOpacity onPress={handel}>
          <Text>ok</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
