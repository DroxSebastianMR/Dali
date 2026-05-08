import LottieView from "lottie-react-native";

import React, { useEffect, useRef } from "react";

import { Text, View } from "react-native";

import Animated, { FadeOut } from "react-native-reanimated";

import { useHapticsLoop } from "@/src/modules/bootstrap/hooks/useHapticsLoop";

import { useWaveAnimation } from "@/src/modules/bootstrap/hooks/useWaveAnimation";

type Props = {
  completed?: boolean;

  onFinish?: () => void;
};

export const BootstrapLoader = ({ completed, onFinish }: Props) => {
  const animationRef = useRef<LottieView>(null);

  const { start, style } = useWaveAnimation();

  useHapticsLoop();

  useEffect(() => {
    start();

    animationRef.current?.play();
  }, []);

  // salida elegante
  useEffect(() => {
    if (!completed) return;

    const timeout = setTimeout(() => {
      onFinish?.();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [completed]);

  return (
    <Animated.View
      exiting={FadeOut.duration(700)}
      className="flex-1 bg-primary items-center justify-center px-6"
    >
      <Animated.View
        className="absolute w-[300px] h-[300px] rounded-full bg-surface"
        style={style}
      />

      <LottieView
        ref={animationRef}
        source={require("@/src/assets/lotties/loader/Shop.json")}
        autoPlay
        loop
        speed={completed ? 1.8 : 0.45}
        style={{
          width: 220,
          height: 220,
        }}
      />

      <View className="absolute bottom-8">
        <Text className="text-textPrimary text-xs opacity-50 tracking-wide">
          © {new Date().getFullYear()} SharkCorp
        </Text>
      </View>
    </Animated.View>
  );
};
