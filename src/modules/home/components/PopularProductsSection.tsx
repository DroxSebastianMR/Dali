import React from "react";

import { FlatList, Text, TouchableOpacity, View } from "react-native";

import { PopularProductCard } from "@/src/modules/home/components/PopularProductCard";

import { popularProductsMock } from "@/src/modules/home/data/popularProducts.mock";

export const PopularProductsSection = () => {
  return (
    <View className="mt-12">
      <View className="flex-row items-center justify-between px-5 mb-4">
        <Text className="text-[18px] font-bold text-[#013220]">
          Productos Populares
        </Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-[14px] font-semibold text-green-700">
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={popularProductsMock}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PopularProductCard item={item} />}
        contentContainerStyle={{
          paddingHorizontal: 18,
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
