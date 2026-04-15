import { LoginScreen } from "@/src/modules/auth/screens/LoginScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};
