import React from "react";
import { Text, View } from "react-native";

type Props = {
  zoom: number;
};

export const ZoomIndicator = ({ zoom }: Props) => {
  const zoomLabel = `${(1 + zoom * 4).toFixed(1)}x`;

  return (
    <View className="absolute bottom-20 left-0 right-0 items-center">
      <View className="bg-black/60 px-4 py-2 rounded-full">
        <Text className="text-white font-semibold">{zoomLabel}</Text>
      </View>
    </View>
  );
};
