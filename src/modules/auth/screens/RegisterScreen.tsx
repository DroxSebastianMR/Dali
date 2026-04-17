import { AuthButton } from "@/src/modules/auth/components/AuthButton";
import { AuthHeader } from "@/src/modules/auth/components/AuthHeader";
import { AuthInput } from "@/src/modules/auth/components/AuthInput";
import { SocialLogin } from "@/src/modules/auth/components/SocialLogin";
import { useAuth } from "@/src/modules/auth/context/AuthProvider";
import React, { useState } from "react";
import { Text, View } from "react-native";

export const RegisterScreen = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");

  const handleRegister = async () => {
    await login(email, password);
  };

  return (
    <View className="flex-1 bg-[#f6f8f6] justify-center px-6">
      <View className="w-full max-w-md self-center">
        <AuthHeader title="Crear cuenta" subtitle="Regístrate para continuar" />

        <View className="mt-6">
          <AuthInput
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
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
          <AuthButton title="Crear cuenta" onPress={handleRegister} />
        </View>
        <SocialLogin />

        <View className="mt-12 items-center">
          <Text className="text-gray-400 text-sm">
            ¿Ya tienes cuenta?{" "}
            <Text className="text-gray-900 font-semibold">Iniciar sesión</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
