import React from "react";

import { Heart, Star } from "lucide-react-native";

import { ImageBackground, Text, TouchableOpacity, View } from "react-native";

export type PopularProduct = {
  id: string;
  title: string;
  image: string;
  rating: number;
  favorite?: boolean;
};

type Props = {
  item: PopularProduct;
};

export const PopularProductCard = ({ item }: Props) => {
  return (
    <View className="mr-4">
      <ImageBackground
        source={{ uri: item.image }}
        className="w-[175px] h-[220px] overflow-hidden justify-between"
        imageStyle={{ borderRadius: 24 }}
      >
        <View className="absolute inset-0 bg-black/10 rounded-[24px]" />

        <View className="flex-1 justify-end p-3">
          <View className="flex-row items-end justify-between">
            <View className="flex-1">
              <View className="self-start bg-black/50 px-3 py-2 rounded-full">
                <Text className="text-white text-[13px] font-semibold">
                  {item.title}
                </Text>
              </View>

              <View className="mt-2 flex-row items-center">
                <View className="flex-row items-center bg-black/50 px-2.5 py-1.5 rounded-full">
                  <Star size={12} fill="#FFD54A" color="#FFD54A" />

                  <Text className="text-white text-[12px] font-semibold ml-1.5">
                    {item.rating}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              className="w-10 h-10 rounded-full bg-white items-center justify-center"
            >
              <Heart
                size={18}
                fill={item.favorite ? "#EF4444" : "transparent"}
                color={item.favorite ? "#EF4444" : "#9CA3AF"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
