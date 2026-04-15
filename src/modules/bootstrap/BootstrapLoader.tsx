import * as Haptics from "expo-haptics";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

/* =========================
   Constants
========================= */
const ANIMATION_DURATION = 2000;
const HAPTIC_DELAYS = {
  HEAVY: 80,
  MEDIUM: 120,
  LIGHT: 200,
  PAUSE: 400,
};

/* =========================
   Types
========================= */
type Props = {
  onFinish?: () => void;
};

/* =========================
   Component
========================= */
export const BootstrapLoader = ({ onFinish }: Props) => {
  const animationRef = useRef<LottieView>(null);
  const isRunning = useRef(true);

  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0.4);

  /* =========================
     Effects
  ========================= */
  useEffect(() => {
    startLottie();
    startWaveAnimation();
    startHaptics();

    return stopAll;
  }, []);

  /* =========================
     Animation Handlers
  ========================= */
  const startLottie = () => {
    animationRef.current?.play();
  };

  const startWaveAnimation = () => {
    scale.value = withRepeat(
      withTiming(3, {
        duration: ANIMATION_DURATION,
        easing: Easing.out(Easing.exp),
      }),
      -1,
      false,
    );

    opacity.value = withRepeat(
      withTiming(0, {
        duration: ANIMATION_DURATION,
      }),
      -1,
      false,
    );
  };

  /* =========================
     Haptics Logic
  ========================= */
  const startHaptics = async () => {
    while (isRunning.current) {
      await triggerHapticSequence();
    }
  };

  const triggerHapticSequence = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await sleep(HAPTIC_DELAYS.HEAVY);

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await sleep(HAPTIC_DELAYS.MEDIUM);

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await sleep(HAPTIC_DELAYS.LIGHT);

    await sleep(HAPTIC_DELAYS.PAUSE);
  };

  const stopAll = () => {
    isRunning.current = false;
  };

  /* =========================
     Animated Styles
  ========================= */
  const waveStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  /* =========================
     Render
  ========================= */
  return (
    <View className="flex-1 bg-[#2bee6c] items-center justify-center px-6">
      {/* Background Wave */}
      <Animated.View
        style={[
          {
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: 999,
            backgroundColor: "#ffffff",
          },
          waveStyle,
        ]}
      />

      {/* Lottie Animation */}
      <LottieView
        ref={animationRef}
        source={require("@/src/assets/lotties/loader/Shop.json")}
        autoPlay
        loop={false}
        style={{ width: 220, height: 220 }}
        onAnimationFinish={() => {
          stopAll();
          onFinish?.();
        }}
      />

      {/* Footer */}
      <View className="absolute bottom-8">
        <Text className="text-black text-xs opacity-50 tracking-wide">
          © {new Date().getFullYear()} SharkCorp
        </Text>
      </View>
    </View>
  );
};

/* =========================
   Utils
========================= */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
