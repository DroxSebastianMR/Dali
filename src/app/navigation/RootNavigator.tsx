import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View } from "react-native";

import { AuthNavigator } from "@/src/app/navigation/AuthNavigator";
import { MainNavigator } from "@/src/app/navigation/MainNavigator";
import { useAuth } from "@/src/modules/auth/context/AuthProvider";

export const RootNavigator = () => {
  const { status } = useAuth();
  if (status === "checking") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {status === "authenticated" ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
