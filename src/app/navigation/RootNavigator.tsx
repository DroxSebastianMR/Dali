import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, View } from "react-native";

import { useAuth } from "@/src/modules/auth/context/AuthProvider";
import { AuthNavigator } from "./AuthNavigator";
import { MainNavigator } from "./MainNavigator";

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
