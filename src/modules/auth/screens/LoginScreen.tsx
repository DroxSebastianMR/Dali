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

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AuthStackParamList } from "@/src/app/navigation/AuthNavigator";

import { AuthButton } from "@/src/modules/auth/components/AuthButton";
import { AuthHeader } from "@/src/modules/auth/components/AuthHeader";
import { AuthInput } from "@/src/modules/auth/components/AuthInput";
import { SocialLogin } from "@/src/modules/auth/components/SocialLogin";

import { useLogin } from "@/src/modules/auth/hooks/useLogin";
import { ScreenLoader } from "@/src/modules/system/ui/components/ScreenLoader";

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Login">;

export const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { form, onChange, handleLogin, loading } = useLogin();

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-[#f6f8f6]">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 justify-center px-6">
              <View className="w-full max-w-md self-center">
                <AuthHeader />

                <View className="mt-6">
                  <AuthInput
                    placeholder="Email"
                    value={form.email}
                    editable={!loading}
                    onChangeText={(text) => onChange("email", text)}
                  />

                  <AuthInput
                    placeholder="Contraseña"
                    secure
                    value={form.password}
                    editable={!loading}
                    onChangeText={(text) => onChange("password", text)}
                  />

                  <Text
                    className="text-center text-gray-400 text-sm mt-2"
                    onPress={() =>
                      !loading && navigation.navigate("RecoverPassword")
                    }
                  >
                    ¿Olvidaste tu contraseña?
                  </Text>

                  <AuthButton
                    disabled={loading}
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
                      onPress={() =>
                        !loading && navigation.navigate("Register")
                      }
                    >
                      Crear cuenta
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <ScreenLoader visible={loading} />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
