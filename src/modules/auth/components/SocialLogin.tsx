import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, View } from "react-native";

export const SocialLogin = () => {
  return (
    <View className="mt-[30px] items-center">
      <View className="flex-row items-center mb-[30px]">
        <View className="flex-1 h-[1px] bg-[#ccc]" />
        <Text className="mx-[10px] text-[#6b7280]">Continúa con</Text>
        <View className="flex-1 h-[1px] bg-[#ccc]" />
      </View>

      <View className="flex-row gap-[20px]">
        <Pressable className="w-[55px] h-[55px] rounded-[15px] bg-white justify-center items-center shadow">
          <AntDesign name="google" size={22} color="#1c1c1c" />
        </Pressable>

        <Pressable className="w-[55px] h-[55px] rounded-[15px] bg-white justify-center items-center shadow">
          <FontAwesome name="facebook" size={22} color="#1c1c1c" />
        </Pressable>

        <Pressable className="w-[55px] h-[55px] rounded-[15px] bg-white justify-center items-center shadow">
          <FontAwesome name="apple" size={24} color="#1c1c1c" />
        </Pressable>
      </View>
    </View>
  );
};
