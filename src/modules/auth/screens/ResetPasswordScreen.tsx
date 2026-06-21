import { AuthStackParamList } from "@/src/app/navigation/AuthNavigator";
import { AuthButton } from "@/src/modules/auth/components/AuthButton";
import { AuthHeader } from "@/src/modules/auth/components/AuthHeader";
import { AuthInput } from "@/src/modules/auth/components/AuthInput";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useResetPassword } from "../hooks/useResetPassword";

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  "ResetPassword"
>;

type ResetPasswordRouteProp = RouteProp<AuthStackParamList, "ResetPassword">;

export const ResetPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ResetPasswordRouteProp>();
  const { token } = route.params;

  const { form, loading, onChange, handleResetPassword } =
    useResetPassword(token);

  const onSubmit = async () => {
    const success = await handleResetPassword();

    if (success) {
      navigation.replace("Login");
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
                title="Nueva contraseña"
                subtitle="Ingresa una nueva contraseña para continuar"
              />

              <View className="mt-6">
                <AuthInput
                  placeholder="Nueva contraseña"
                  secure
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={form.newPassword}
                  editable={!loading}
                  onChangeText={(value) => onChange("newPassword", value)}
                />

                <AuthInput
                  placeholder="Confirmar contraseña"
                  secure
                  autoCapitalize="none"
                  autoCorrect={false}
                  value={form.confirmPassword}
                  editable={!loading}
                  onChangeText={(value) => onChange("confirmPassword", value)}
                />

                <AuthButton
                  title={loading ? "Actualizando..." : "Restablecer Contraseña"}
                  onPress={onSubmit}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
