import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { CategoriesSection } from "@/src/modules/home/components/CategoriesSection";
import { HomeHeader } from "@/src/modules/home/components/HomeHeader";
import { PromotionsCarousel } from "@/src/modules/home/components/PromotionsCarousel";

import { promotionsMock } from "@/src/modules/home/data/promotions.mock";

export const HomeScreen = () => {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-background">
          <HomeHeader />
          <PromotionsCarousel data={promotionsMock} />
          <CategoriesSection />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
