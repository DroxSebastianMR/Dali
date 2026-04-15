import React from "react";
import { TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  secure?: boolean;
};

export const AuthInput = ({ placeholder, secure }: Props) => {
  return (
    <View className="w-full bg-white rounded-[10px] border border-[#e5e7eb] mb-[15px]">
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secure}
        placeholderTextColor="#9ca3af"
        className="px-[15px] py-[15px] text-[14px]"
      />
    </View>
  );
};
