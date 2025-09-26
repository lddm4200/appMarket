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

SplashScreen.preventAutoHideAsync();
export default function AuthLayout() {
  const { checkAuth, user, token }: any = useAuthStore();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)";
    const isSignedIn = user && token;
    if (isSignedIn && inAuthScreen) return router.replace("/(tabs)");
  }, [user, token, segments]);
  return <Stack screenOptions={{ headerShown: false }} />;
}
