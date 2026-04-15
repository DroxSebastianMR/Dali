import { AuthButton } from "@/src/modules/auth/components/AuthButton";
import { AuthHeader } from "@/src/modules/auth/components/AuthHeader";
import { AuthInput } from "@/src/modules/auth/components/AuthInput";
import { SocialLogin } from "@/src/modules/auth/components/SocialLogin";
import { useAuth } from "@/src/modules/auth/context/AuthProvider";
import React from "react";
import { Text, View } from "react-native";

export const LoginScreen = () => {
  const { login } = useAuth();

  return (
    <View className="flex-1 bg-[#f6f8f6] justify-center px-6">
      <View className="w-full max-w-md self-center">
        <AuthHeader />
        <View className="mt-6">
          <AuthInput placeholder="Email" />
          <AuthInput placeholder="Contraseña" secure />
          <Text className="text-center text-gray-400 text-sm mt-2">
            ¿Olvidaste tu contraseña?
          </Text>
          <AuthButton title="Sign in" onPress={login} />
        </View>
        <SocialLogin />
        <View className="mt-12 items-center">
          <Text className="text-gray-400 text-sm">
            ¿No tienes cuenta?{" "}
            <Text className="text-gray-900 font-semibold">Crear cuenta</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
