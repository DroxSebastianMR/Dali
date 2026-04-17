import { AuthButton } from "@/src/modules/auth/components/AuthButton";
import { AuthHeader } from "@/src/modules/auth/components/AuthHeader";
import { AuthInput } from "@/src/modules/auth/components/AuthInput";
import React, { useState } from "react";
import { Text, View } from "react-native";

export const RecoverPasswordScreen = () => {
  const [email, setEmail] = useState("");

  const handleRecover = async () => {
    console.log("Recuperar contraseña para:", email);
  };

  return (
    <View className="flex-1 bg-[#f6f8f6] justify-center px-6">
      <View className="w-full max-w-md self-center">
        <AuthHeader
          title="Recuperar contraseña"
          subtitle="Te enviaremos un enlace para restablecerla"
        />

        <View className="mt-6">
          <AuthInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <AuthButton title="Enviar enlace" onPress={handleRecover} />
        </View>

        <View className="mt-12 items-center">
          <Text className="text-gray-400 text-sm">
            ¿Recordaste tu contraseña?{" "}
            <Text className="text-gray-900 font-semibold">Iniciar sesión</Text>
          </Text>
        </View>
      </View>
    </View>
  );
};
