import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { LoginScreen } from "@/src/modules/auth/screens/LoginScreen";
import { RecoverPasswordScreen } from "@/src/modules/auth/screens/RecoverPasswordScreen";
import { RegisterScreen } from "@/src/modules/auth/screens/RegisterScreen";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  RecoverPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
    </Stack.Navigator>
  );
};
