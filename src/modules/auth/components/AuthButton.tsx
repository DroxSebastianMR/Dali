import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean; // 👈 nuevo
};

export const AuthButton = ({ title, onPress, disabled = false }: Props) => {
  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      className={`py-[15px] rounded-[25px] items-center mt-[10px] ${
        disabled ? "bg-gray-300" : "bg-primary active:bg-primaryDark"
      }`}
    >
      <Text
        className={`font-semibold ${disabled ? "text-gray-500" : "text-white"}`}
      >
        {title}
      </Text>
    </Pressable>
  );
};
