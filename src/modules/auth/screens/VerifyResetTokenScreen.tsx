import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { AuthStackParamList } from "@/src/app/navigation/AuthNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useVerifyResetToken } from "../hooks/useVerifyResetToken";

import { AuthButton } from "@/src/modules/auth/components/AuthButton";
import { AuthHeader } from "@/src/modules/auth/components/AuthHeader";
import { AuthInput } from "@/src/modules/auth/components/AuthInput";

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "VerifyResetToken"
>;

export const VerifyResetTokenScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { form, loading, onChange, handleVerifyResetToken } =
    useVerifyResetToken();

  const onSubmit = async () => {
    const success = await handleVerifyResetToken();

    if (success) {
      navigation.navigate("ResetPassword", { token: form.token });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <View className="flex-1 bg-[#f6f8f6] justify-center px-6">
            <View className="w-full max-w-md self-center">
              <AuthHeader
                title="Verificar código"
                subtitle="Ingresa el código que enviamos a tu correo"
              />

              <View className="mt-6">
                <AuthInput
                  placeholder="Código"
                  value={form.token}
                  editable={!loading}
                  autoCapitalize="characters"
                  autoCorrect={false}
                  onChangeText={(value) => onChange("token", value)}
                />

                <View className="mt-4">
                  <AuthButton
                    title={loading ? "Verificando..." : "Verificar código"}
                    disabled={loading}
                    onPress={onSubmit}
                  />
                </View>
              </View>

              <View className="mt-12 items-center">
                <Text className="text-gray-400 text-sm">
                  ¿No recibiste el código?{" "}
                  <Text
                    className="text-gray-900 font-semibold"
                    onPress={() => navigation.navigate("RecoverPassword")}
                  >
                    Reenviar
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
