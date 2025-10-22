import { View, Text } from "react-native";
import React, { useEffect } from "react";
import {
  Redirect,
  SplashScreen,
  Stack,
  useRouter,
  useSegments,
} from "expo-router";
import { useAuthStore } from "@/store/authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
