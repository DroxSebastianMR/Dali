import React from "react";

import { PromotionCard } from "@/src/modules/home/components/PromotionCard";
import { usePromotionsCarousel } from "@/src/modules/home/hooks/usePromotionsCarousel";
import { Dimensions, FlatList, View } from "react-native";

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
  const {
    flatListRef,
    activeIndex,
    safeData,
    startAutoPlay,
    stopAutoPlay,
    handleMomentumEnd,
    handleScrollToIndexFailed,
  } = usePromotionsCarousel(data);

  return (
    <View className="-mt-2">
      <FlatList
        ref={flatListRef}
        data={safeData}
        horizontal
        pagingEnabled
        bounces={false}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PromotionCard item={item} />}
        onMomentumScrollEnd={handleMomentumEnd}
        onTouchStart={stopAutoPlay}
        onTouchEnd={startAutoPlay}
        onScrollBeginDrag={stopAutoPlay}
        onScrollEndDrag={startAutoPlay}
        onScrollToIndexFailed={handleScrollToIndexFailed}
        getItemLayout={(_, index) => ({
          length: Dimensions.get("window").width,
          offset: Dimensions.get("window").width * index,
          index,
        })}
      />

      <View className="flex-row justify-center mt-3">
        {safeData.map((_, index) => (
          <View
            key={index}
            className={`mx-1 rounded-full ${
              index === activeIndex
                ? "bg-green-600 w-6 h-2"
                : "bg-gray-300 w-2 h-2"
            }`}
          />
        ))}
      </View>
    </View>
  );
};
