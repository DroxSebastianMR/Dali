import { Skeleton } from "@/src/shared/components/Skeleton";
import React from "react";
import { View } from "react-native";

export const PopularProductsSkeleton = () => {
  return (
    <View className="mt-12">
      <View className="flex-row justify-between px-5 mb-4">
        <Skeleton width={160} height={20} borderRadius={6} />
        <Skeleton width={80} height={18} borderRadius={6} />
      </View>

      <View className="flex-row px-5">
        {[1, 2, 3].map((i) => (
          <View key={i} className="mr-4">
            <Skeleton width={120} height={120} borderRadius={12} />
            <View className="mt-2">
              <Skeleton width={100} height={14} borderRadius={6} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
