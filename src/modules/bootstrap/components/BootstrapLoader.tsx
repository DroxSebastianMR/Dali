import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { useHapticsLoop } from "@/src/modules/bootstrap/hooks/useHapticsLoop";
import { useWaveAnimation } from "@/src/modules/bootstrap/hooks/useWaveAnimation";

type Props = {
  onFinish?: () => void;
};

export const BootstrapLoader = ({ onFinish }: Props) => {
  const animationRef = useRef<LottieView>(null);

  const { start, style } = useWaveAnimation();
  useHapticsLoop();

  useEffect(() => {
    animationRef.current?.play();
    start();
  }, []);

  return (
    <View className="flex-1 bg-primary items-center justify-center px-6">
      <Animated.View
        className="absolute w-[300px] h-[300px] rounded-full bg-surface"
        style={style}
      />
      <LottieView
        ref={animationRef}
        source={require("@/src/assets/lotties/loader/Shop.json")}
        autoPlay
        loop={false}
        style={{ width: 220, height: 220 }}
        onAnimationFinish={onFinish}
      />
      <View className="absolute bottom-8">
        <Text className="text-textPrimary text-xs opacity-50 tracking-wide">
          © {new Date().getFullYear()} SharkCorp
        </Text>
      </View>
    </View>
  );
};
