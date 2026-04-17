import React from "react";
import { TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  secure?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
};

export const AuthInput = ({
  placeholder,
  secure,
  value,
  onChangeText,
}: Props) => {
  return (
    <View className="w-full bg-white rounded-[10px] border border-[#e5e7eb] mb-[15px]">
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secure}
        placeholderTextColor="#9ca3af"
        value={value}
        onChangeText={onChangeText}
        className="px-[15px] py-[15px] text-[14px]"
      />
    </View>
  );
};
