import { ScanButton } from "@/src/modules/system/ui/navigation/ScanButton";
import { TabBarBackground } from "@/src/modules/system/ui/navigation/TabBarBackground";
import {
    HapticType,
    triggerHaptic,
} from "@/src/shared/haptics/haptics.service";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Heart, Home, List, User } from "lucide-react-native";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TABS_CONFIG: Record<
  string,
  {
    icon: any;
    label: string;
  }
> = {
  Home: { icon: Home, label: "Inicio" },
  List: { icon: List, label: "Listas" },
  Favorites: { icon: Heart, label: "Favoritos" },
  Profile: { icon: User, label: "Perfil" },
};

export const CustomTabBar = ({ state, navigation }: BottomTabBarProps) => {
  const handleNavigation = useCallback(
    async (routeName: string, isFocused: boolean) => {
      if (isFocused) return;

      await triggerHaptic(HapticType.LIGHT);
      navigation.navigate(routeName);
    },
    [navigation],
  );

  const handleScanPress = useCallback(async () => {
    await triggerHaptic(HapticType.MEDIUM);
    navigation.navigate("Scan");
  }, [navigation]);

  return (
    <View className="absolute bottom-0 left-0 right-0">
      <TabBarBackground />

      <View className="absolute bottom-0 left-0 right-0 pt-4 pb-8 px-4 flex-row items-center justify-between">
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          if (route.name === "Scan") {
            return <ScanButton key={route.key} onPress={handleScanPress} />;
          }
          const tabConfig = TABS_CONFIG[route.name];
          if (!tabConfig) return null;

          const Icon = tabConfig.icon;
          const isLeftSide = index === 1;
          const isRightSide = index === 3;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => handleNavigation(route.name, isFocused)}
              className={`flex-1 items-center ${
                isLeftSide ? "mr-4" : ""
              } ${isRightSide ? "ml-4" : ""}`}
              activeOpacity={0.8}
            >
              <Icon size={24} color={isFocused ? "#22c55e" : "#9ca3af"} />

              <Text
                className={`text-[12px] mt-1 ${
                  isFocused ? "text-green-500" : "text-gray-400"
                }`}
              >
                {tabConfig.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
