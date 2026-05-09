import { Promotion } from "@/src/modules/home/components/PromotionsCarousel";
import React from "react";
import { Dimensions, ImageBackground, Text, View } from "react-native";

const { width } = Dimensions.get("window");

type Props = {
  item: Promotion;
};

export const PromotionCard = ({ item }: Props) => {
  return (
    <View style={{ width }} className="px-4">
      <ImageBackground
        source={{ uri: item.image }}
        className="h-[180px] justify-end"
        imageStyle={{ borderRadius: 20 }}
      >
        <View className="absolute inset-0 bg-black/30 rounded-2xl" />
        <View className="p-4">
          {item.tag && (
            <View className="bg-green-700 self-start px-3 py-1 rounded-full mb-2">
              <Text className="text-white text-[11px] font-semibold">
                {item.tag}
              </Text>
            </View>
          )}
          <Text className="text-white text-xl font-bold leading-tight">
            {item.title}
          </Text>
          <Text className="text-white text-sm opacity-90 mt-1">
            {item.subtitle}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};
