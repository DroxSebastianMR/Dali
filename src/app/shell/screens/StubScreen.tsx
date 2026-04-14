import React from "react";
import { Text, View } from "react-native";

type Props = {
  title: string;
};

export const StubScreen = ({ title }: Props) => {
  return (
    <View className="flex-1 bg-black items-center justify-center">
      <Text className="text-white text-3xl font-semibold">{title}</Text>
    </View>
  );
};
