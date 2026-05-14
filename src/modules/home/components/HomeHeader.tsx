import {
  Bell,
  MapPin,
  QrCode,
  Search,
  SlidersHorizontal,
} from "lucide-react-native";

import React from "react";

import { useAuth } from "@/src/modules/auth/context/AuthProvider";
import { useUserLocation } from "@/src/modules/location/hooks/useUserLocation";

import { Image, Pressable, Text, TextInput, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

export const HomeHeader = () => {
  const { city, country } = useUserLocation();
  const { user, logout } = useAuth();

  const navigation = useNavigation<any>();

  const avatar = user?.photo_url?.trim() || "https://i.pravatar.cc/100";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log("Error al cerrar sesión", error);
    }
  };

  const goToScanner = () => {
    navigation.navigate("Scan");
  };

  return (
    <SafeAreaView className="px-6 pt-0">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <MapPin size={18} color="#16a34a" />

          <View>
            <Text className="text-gray-400 text-xs tracking-wide">
              UBICACIÓN
            </Text>

            <Text className="text-green-700 font-semibold text-base">
              {city}, {country}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center gap-4">
          <View className="relative">
            <Bell size={22} color="#166534" />

            <View className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
          </View>

          <Pressable onPress={handleLogout}>
            <Image
              source={{ uri: avatar }}
              className="w-10 h-10 rounded-full border-2 border-green-600"
            />
          </Pressable>
        </View>
      </View>
      <View className="flex-row items-center mt-5">
        <View className="flex-1 flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
          <Search size={18} color="#9ca3af" />

          <TextInput
            placeholder="Buscar productos..."
            placeholderTextColor="#9ca3af"
            className="ml-2 flex-1 text-gray-700"
          />

          <View className="flex-row items-center ml-2">
            <View className="w-[1px] h-5 bg-gray-200 mr-2" />

            {/* 📸 BOTÓN SCANNER */}
            <Pressable onPress={goToScanner}>
              <QrCode size={18} color="#16a34a" />
            </Pressable>
          </View>
        </View>

        <View className="ml-3 w-12 h-12 bg-green-600 rounded-full items-center justify-center">
          <SlidersHorizontal size={20} color="#fff" />
        </View>
      </View>
    </SafeAreaView>
  );
};
