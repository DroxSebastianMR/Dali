import React from "react";

import { CategoriesSection } from "@/src/modules/home/components/CategoriesSection";
import { HomeHeader } from "@/src/modules/home/components/HomeHeader";
import { PopularProductsSection } from "@/src/modules/home/components/PopularProductsSection";
import { PromotionsCarousel } from "@/src/modules/home/components/PromotionsCarousel";

import { useHomeBanners } from "@/src/modules/home/hooks/useHomeBanners";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { PopularProductsSkeleton } from "@/src/modules/home/components/PopularProductsSkeleton";
import { PromotionsCarouselSkeleton } from "@/src/modules/home/components/PromotionsCarouselSkeleton";

export const HomeScreen = () => {
  const { banners, loading } = useHomeBanners();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{
              paddingBottom: Platform.OS === "ios" ? 120 : 105,
              paddingTop: Platform.OS === "ios" ? -15 : 0,
            }}
            showsVerticalScrollIndicator={false}
          >
            <HomeHeader />

            {loading ? (
              <PromotionsCarouselSkeleton />
            ) : (
              <PromotionsCarousel
                data={banners.map((banner) => ({
                  id: String(banner.id),
                  title: banner.title,
                  subtitle: banner.subtitle || "",
                  image: banner.imageUrl,
                  tag: banner.badgeText,
                }))}
              />
            )}

            <CategoriesSection />

            {loading ? <PopularProductsSkeleton /> : <PopularProductsSection />}

            <View className="h-2" />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
