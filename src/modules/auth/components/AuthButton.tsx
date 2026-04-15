import React from "react";
import { Pressable, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export const AuthButton = ({ title, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-[#2bee6c] py-[15px] rounded-[25px] items-center mt-[10px]"
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
};
