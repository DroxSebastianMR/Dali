import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
  actionLabel?: string;
  onAction?: () => void;
};

export const StubScreen = ({
  title,
  message,
  onRetry,
  showRetry,
  actionLabel,
  onAction,
}: Props) => {
  return (
    <View className="flex-1 bg-[#2bee6c] items-center justify-center px-6">
      <View className="w-full max-w-md bg-white rounded-3xl p-8 shadow-lg items-center">
        <Text className="text-2xl font-bold text-gray-900 mb-2">Dali</Text>

        <Text className="text-lg font-semibold text-gray-700 mb-2">
          {title}
        </Text>

        {message && (
          <Text className="text-gray-500 text-center mb-8">{message}</Text>
        )}

        <View className="w-full">
          {showRetry && (
            <Pressable
              onPress={onRetry}
              className="bg-black py-3 rounded-xl mb-3 items-center"
            >
              <Text className="text-white font-semibold">Reintentar</Text>
            </Pressable>
          )}

          {actionLabel && onAction && (
            <Pressable
              onPress={onAction}
              className="bg-[#2bee6c] py-3 rounded-xl items-center border border-[#2bee6c]"
            >
              <Text className="text-black font-semibold">{actionLabel}</Text>
            </Pressable>
          )}
        </View>
      </View>

      <Text className="text-white text-xs mt-6 opacity-80">
        © {new Date().getFullYear()} SharkCorp
      </Text>
    </View>
  );
};
