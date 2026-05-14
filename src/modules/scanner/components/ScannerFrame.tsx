import React from "react";
import { Dimensions, View } from "react-native";

const { width } = Dimensions.get("window");

const FRAME_WIDTH = width * 0.82;
const FRAME_HEIGHT = FRAME_WIDTH * 1.45;

export const ScannerFrame = () => {
  return (
    <View className="absolute inset-0 items-center justify-center">
      <View
        className="border-4 border-green-500 rounded-3xl"
        style={{
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
        }}
      />
    </View>
  );
};
