import React from "react";
import { TextInput, TextInputProps, View } from "react-native";

type Props = TextInputProps & {
  secure?: boolean;
};

export const AuthInput = ({ secure, editable = true, ...rest }: Props) => {
  return (
    <View
      className={`w-full rounded-[10px] border mb-[15px] ${
        editable ? "bg-white border-[#e5e7eb]" : "bg-gray-100 border-gray-200"
      }`}
    >
      <TextInput
        {...rest}
        secureTextEntry={secure}
        placeholderTextColor="#9ca3af"
        editable={editable}
        className="px-[15px] py-[15px] text-[14px]"
      />
    </View>
  );
};
