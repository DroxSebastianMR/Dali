import { useAuth } from "@/src/modules/auth/context/AuthProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";

const Stack = createNativeStackNavigator();

const HomeScreen = () => {
  const { logout } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      <Button title="Cerrar sesión" onPress={logout} />
    </View>
  );
};

export const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};
