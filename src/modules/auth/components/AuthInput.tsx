import React from "react";
import { TextInput, View } from "react-native";

type Props = {
  placeholder: string;
  secure?: boolean;
  value?: string;
  editable?: boolean; // 👈 nuevo
  onChangeText?: (text: string) => void;
};

export const AuthInput = ({
  placeholder,
  secure,
  value,
  editable = true,
  onChangeText,
}: Props) => {
  return (
    <View
      className={`w-full rounded-[10px] border mb-[15px] ${
        editable ? "bg-white border-[#e5e7eb]" : "bg-gray-100 border-gray-200"
      }`}
    >
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secure}
        placeholderTextColor="#9ca3af"
        value={value}
        editable={editable} // 👈 clave
        onChangeText={onChangeText}
        className="px-[15px] py-[15px] text-[14px]"
      />
    </View>
  );
};
