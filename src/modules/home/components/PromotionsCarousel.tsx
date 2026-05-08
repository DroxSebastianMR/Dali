import { PromotionCard } from "@/src/modules/home/components/PromotionCard";
import React from "react";
import { FlatList, View } from "react-native";

export type Promotion = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  tag?: string;
};

type Props = {
  data: Promotion[];
};

export const PromotionsCarousel = ({ data }: Props) => {
  return (
    <View className="mt-4">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => <PromotionCard item={item} />}
      />
    </View>
  );
};
