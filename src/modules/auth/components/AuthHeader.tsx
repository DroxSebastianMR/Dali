import React from "react";
import { Text, View } from "react-native";

type Props = {
  title?: string;
  subtitle?: string;
};

export const AuthHeader = ({
  title = "Bienvenido a DALI",
  subtitle = "Compra inteligente, compra local",
}: Props) => {
  return (
    <View className="items-center mb-[30px]">
      <View className="w-[70px] h-[70px] rounded-[20px] bg-[#d1fae5] justify-center items-center mb-[20px]">
        <Text className="text-[30px]">🛍️</Text>
      </View>

      <Text className="text-[22px] font-bold text-[#1c1c1c]">{title}</Text>

      <Text className="text-[#6b7280] mt-[5px] text-center">{subtitle}</Text>
    </View>
  );
};
