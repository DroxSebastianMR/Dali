import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const ScannerHeader = () => {
  const navigation = useNavigation();

  return (
    <View className="absolute top-14 left-4 right-4 flex-row items-center justify-between">
      {/* BACK BUTTON */}
      <Pressable
        onPress={() => navigation.goBack()}
        className="w-10 h-10 rounded-full bg-black/40 items-center justify-center"
      >
        <ChevronLeft color="white" size={22} />
      </Pressable>

      {/* TITLE */}
      <Text className="text-white text-lg font-semibold">
        Escanea productos
      </Text>

      {/* espacio balance */}
      <View className="w-10 h-10" />
    </View>
  );
};
