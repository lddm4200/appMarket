import { DynamicColorIOS } from "react-native";
import React from "react";
import {
  NativeTabs,
  Icon,
  Label,
  Badge,
} from "expo-router/unstable-native-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs, useRouter, useSegments } from "expo-router";
import COLORS from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore } from "@/store/authStore";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.textPrimary,
          fontWeight: "600",
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingTop: 5,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>

    // <NativeTabs
    //   tintColor={COLORS.primary}
    //   backgroundColor={COLORS.cardBackground}
    //   iconColor={COLORS.black}
    //   badgeTextColor={COLORS.textPrimary}
    //   >
    //   <NativeTabs.Trigger name="index" >
    //     <Icon sf="house.fill" drawable="ic_menu_mylocation" />
    //     <Label>Home</Label>
    //   </NativeTabs.Trigger>
    //   <NativeTabs.Trigger name="create">
    //     <Icon sf="bell" drawable="ic_input_add" />
    //     <Label>Create</Label>
    //   </NativeTabs.Trigger>
    //   <NativeTabs.Trigger name="cart">
    //     <Icon sf="wand.and.rays" drawable="ic_menu_mylocation" />
    //     <Label>Cart</Label>
    //   </NativeTabs.Trigger>
    //   <NativeTabs.Trigger name="profile">
    //     <Icon sf="wand.and.rays" drawable="ic_menu_mylocation" />
    //     <Label>Profile</Label>
    //   </NativeTabs.Trigger>
    // </NativeTabs>
  );
}
