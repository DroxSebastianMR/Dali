import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { useSocialLogin } from "@/src/modules/auth/hooks/useSocialLogin";

export const SocialLogin = () => {
  const { handleSocialLogin, loading } = useSocialLogin();

  return (
    <View className="mt-[30px] items-center">
      <View className="flex-row items-center mb-[30px]">
        <View className="flex-1 h-[1px] bg-[#ccc]" />
        <Text className="mx-[10px] text-[#6b7280]">Continúa con</Text>
        <View className="flex-1 h-[1px] bg-[#ccc]" />
      </View>

      <View className="flex-row gap-[20px]">
        {/* GOOGLE */}
        <Pressable
          onPress={() => handleSocialLogin("google")}
          disabled={loading}
          className="w-[55px] h-[55px] rounded-[15px] bg-white justify-center items-center shadow"
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <AntDesign name="google" size={22} color="#1c1c1c" />
          )}
        </Pressable>

        {/* FACEBOOK */}
        <Pressable
          onPress={() => handleSocialLogin("facebook")}
          disabled={loading}
          className="w-[55px] h-[55px] rounded-[15px] bg-white justify-center items-center shadow"
        >
          <FontAwesome name="facebook" size={22} color="#1c1c1c" />
        </Pressable>

        {/* APPLE */}
        <Pressable
          onPress={() => handleSocialLogin("apple")}
          disabled={loading}
          className="w-[55px] h-[55px] rounded-[15px] bg-white justify-center items-center shadow"
        >
          <FontAwesome name="apple" size={24} color="#1c1c1c" />
        </Pressable>
      </View>
    </View>
  );
};
