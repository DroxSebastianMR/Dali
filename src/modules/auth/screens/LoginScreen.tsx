import React, { useState } from "react";
import { Text, View } from "react-native";

import { AuthButton } from "@/src/modules/auth/components/AuthButton";
import { AuthHeader } from "@/src/modules/auth/components/AuthHeader";
import { AuthInput } from "@/src/modules/auth/components/AuthInput";
import { SocialLogin } from "@/src/modules/auth/components/SocialLogin";
import { useAuth } from "@/src/modules/auth/context/AuthProvider";

import { AuthStackParamList } from "@/src/app/navigation/AuthNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export const LoginScreen = () => {
  const { login } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await login(email, password);
  };

  return (
    <View className="flex-1 bg-[#f6f8f6] justify-center px-6">
      <View className="w-full max-w-md self-center">
        <AuthHeader />

        <View className="mt-6">
          <AuthInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <AuthInput
            placeholder="Contraseña"
            secure
            value={password}
            onChangeText={setPassword}
          />

          <Text
            className="text-center text-gray-400 text-sm mt-2"
            onPress={() => navigation.navigate("RecoverPassword")}
          >
            ¿Olvidaste tu contraseña?
          </Text>

          <AuthButton title="Sign in" onPress={handleLogin} />
        </View>

        <SocialLogin />

        <View className="mt-12 items-center">
          <Text className="text-gray-400 text-sm">
            ¿No tienes cuenta?{" "}
            <Text
              className="text-gray-900 font-semibold"
              onPress={() => navigation.navigate("Register")}
            >
              Crear cuenta
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
