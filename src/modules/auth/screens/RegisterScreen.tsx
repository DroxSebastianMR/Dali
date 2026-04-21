import React, { useState } from "react";
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

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, "Register">;

export const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));

      console.log("Registro:", form);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
                title="Crear cuenta"
                subtitle="Regístrate para comenzar"
              />

              <View className="mt-6">
                <AuthInput
                  placeholder="Nombre"
                  value={form.nombre}
                  onChangeText={(text) => onChange("nombre", text)}
                />

                <AuthInput
                  placeholder="Apellido"
                  value={form.apellido}
                  onChangeText={(text) => onChange("apellido", text)}
                />

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

                <AuthButton
                  title={loading ? "Creando..." : "Crear cuenta"}
                  onPress={handleRegister}
                />
              </View>

              <View className="mt-12 items-center">
                <Text className="text-gray-400 text-sm">
                  ¿Ya tienes cuenta?{" "}
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
