import React from "react";
import { Text, View } from "react-native";

export const AuthHeader = () => {
  return (
    <View className="items-center mb-[30px]">
      <View className="w-[70px] h-[70px] rounded-[20px] bg-[#d1fae5] justify-center items-center mb-[20px]">
        <Text className="text-[30px]">🛍️</Text>
      </View>

      <Text className="text-[22px] font-bold text-[#1c1c1c]">
        Bienvenido a DALI
      </Text>

      <Text className="text-[#6b7280] mt-[5px]">
        Compra inteligente, compra local
      </Text>
    </View>
  );
};
