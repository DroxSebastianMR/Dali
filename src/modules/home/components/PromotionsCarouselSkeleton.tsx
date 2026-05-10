import { Skeleton } from "@/src/shared/components/Skeleton";
import React from "react";
import { Dimensions, View } from "react-native";

export const PromotionsCarouselSkeleton = () => {
  const width = Dimensions.get("window").width;

  return (
    <View className="-mt-2">
      <View
        style={{
          width,
          height: 160,
          paddingHorizontal: 16,
        }}
      >
        <Skeleton width="100%" height={160} borderRadius={16} />
      </View>

      <View className="flex-row justify-center mt-3">
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            width={i === 1 ? 24 : 8}
            height={8}
            borderRadius={4}
            style={{ marginHorizontal: 4 }}
          />
        ))}
      </View>
    </View>
  );
};
