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
import { AuthButton } from "@/src/modules/auth/components/AuthButton";
import { AuthHeader } from "@/src/modules/auth/components/AuthHeader";
import { AuthInput } from "@/src/modules/auth/components/AuthInput";
import { SocialLogin } from "@/src/modules/auth/components/SocialLogin";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useLogin } from "@/src/modules/auth/hooks/useLogin";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { form, onChange, handleLogin, loading } = useLogin();

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
              <AuthHeader />

              <View className="mt-6">
                <AuthInput
                  placeholder="Email"
                  value={form.email}
                  onChangeText={(text) => onChange("email", text)}
                />

                <AuthInput
                  placeholder="Contraseña"
                  secure
                  value={form.password}
                  onChangeText={(text) => onChange("password", text)}
                />

                <Text
                  className="text-center text-gray-400 text-sm mt-2"
                  onPress={() => navigation.navigate("RecoverPassword")}
                >
                  ¿Olvidaste tu contraseña?
                </Text>

                <AuthButton
                  title={loading ? "Cargando..." : "Sign in"}
                  onPress={handleLogin}
                />
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
