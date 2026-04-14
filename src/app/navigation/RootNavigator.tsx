import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";

/**
 * Stacks temporales
 * Se eliminan cuando AuthNavigator y MainNavigator estén listos
 */

const Stack = createNativeStackNavigator();

const TempAuthScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Auth Flow (pendiente)</Text>
  </View>
);

const TempMainScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Main App (pendiente)</Text>
  </View>
);

export const RootNavigator = () => {
  const isAuthenticated = false;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={TempMainScreen} />
        ) : (
          <Stack.Screen name="Auth" component={TempAuthScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
