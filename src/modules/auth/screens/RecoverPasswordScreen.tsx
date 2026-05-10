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

import { AuthButton } from "@/src/modules/auth/components/AuthButton";
import { AuthHeader } from "@/src/modules/auth/components/AuthHeader";
import { AuthInput } from "@/src/modules/auth/components/AuthInput";

import { AuthStackParamList } from "@/src/app/navigation/AuthNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRecoverPassword } from "../hooks/useRecoverPassword";

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "RecoverPassword"
>;

export const RecoverPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { form, loading, onChange, handleRecoverPassword } = useRecoverPassword();

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
                title="Recuperar contraseña"
                subtitle="Te enviaremos un enlace para restablecerla"
              />

              <View className="mt-6">
                <AuthInput
                  placeholder="Email"
                  value={form.email}
                  onChangeText={(value) => 
                    onChange("email", value)
                  }
                  // keyboardType="email-address"
                  // autoCapitalize="none"
                  // autoCorrect={false}
                />

                <AuthButton
                  title={loading ? "Enviando..." : "Enviar enlace"}
                  onPress={handleRecoverPassword}
                />
              </View>

              <View className="mt-12 items-center">
                <Text className="text-gray-400 text-sm">
                  ¿Recordaste tu contraseña?{" "}
                  <Text
                    className="text-gray-900 font-semibold"
                    onPress={() => navigation.navigate("Login")}
                  >
                    Iniciar sesión
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
