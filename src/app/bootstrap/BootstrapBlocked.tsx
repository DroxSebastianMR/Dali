import { BootstrapState } from "@/src/app/bootstrap/bootstrap.types";
import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  state: BootstrapState;
  onRetry: () => void;
};

export const BootstrapBlocked = ({ state, onRetry }: Props) => {
  const renderMessage = () => {
    switch (state.status) {
      case "maintenance":
        return state.message ?? "Sistema en mantenimiento.";
      case "offline":
        return "Sin conexión a internet.";
      case "update-required":
        return "Necesitas actualizar la app para continuar.";
      case "update-optional":
        return "Hay una nueva versión disponible.";
      default:
        return "Ocurrió un error inesperado.";
    }
  };

  const showRetry =
    state.status === "offline" ||
    state.status === "error" ||
    state.status === "maintenance";

  return (
    <View className="flex-1 bg-[#2bee6c] items-center justify-center px-6">
      <View className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg items-center">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Dali</Text>
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          {state.status === "offline" && "Sin conexión"}
          {state.status === "maintenance" && "Mantenimiento"}
          {state.status === "update-required" && "Actualización requerida"}
          {state.status === "update-optional" && "Actualización disponible"}
          {state.status === "error" && "Error"}
        </Text>

        {/* Mensaje */}
        <Text className="text-gray-500 text-center mb-8">
          {renderMessage()}
        </Text>

        {/* Botones */}
        <View className="w-full">
          {/* Retry */}
          {showRetry && (
            <Pressable
              onPress={onRetry}
              className="bg-black py-3 rounded-xl mb-3 items-center"
            >
              <Text className="text-white font-semibold">Reintentar</Text>
            </Pressable>
          )}

          {/* Update */}
          {(state.status === "update-required" ||
            state.status === "update-optional") &&
            state.url && (
              <Pressable className="bg-[#2bee6c] py-3 rounded-xl items-center border border-[#2bee6c]">
                <Text className="text-black font-semibold">Actualizar</Text>
              </Pressable>
            )}
        </View>
      </View>

      {/* Footer */}
      <Text className="text-white text-xs mt-6 opacity-80">
        © {new Date().getFullYear()} SharkCorp
      </Text>
    </View>
  );
};
