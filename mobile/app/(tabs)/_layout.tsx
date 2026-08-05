import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import { FloatingContactButton } from "@/components/FloatingContactButton";
import { fonts } from "@/constants/theme";
import { useLocale } from "@/context/LocaleContext";
import { useTheme } from "@/context/ThemeContext";

export default function TabsLayout() {
  const { colors } = useTheme();
  const { t } = useLocale();

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.inkFaint,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.rule,
            borderTopWidth: 1,
            height: 64,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontFamily: fonts.body,
            fontSize: 10.5,
            letterSpacing: 0.2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: t("nav.home"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: t("nav.menu"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "restaurant" : "restaurant-outline"} size={21} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="evenementiel"
          options={{
            title: t("nav.events"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "calendar" : "calendar-outline"} size={21} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="galerie"
          options={{
            title: t("nav.gallery"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "images" : "images-outline"} size={21} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="contact"
          options={{
            title: t("nav.contact"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? "call" : "call-outline"} size={20} color={color} />
            ),
          }}
        />
      </Tabs>
      <FloatingContactButton />
    </View>
  );
}
