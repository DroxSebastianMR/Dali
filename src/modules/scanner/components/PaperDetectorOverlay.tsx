import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";

const { width, height } = Dimensions.get("window");

const BASE_W = width * 0.82;
const BASE_H = BASE_W * 1.45;

export const PaperTrackingOverlay = () => {
  const posX = useRef(new Animated.Value(0)).current;
  const posY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const moveRandomly = () => {
      Animated.parallel([
        Animated.timing(posX, {
          toValue: (Math.random() - 0.5) * 10, // micro movimiento
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(posY, {
          toValue: (Math.random() - 0.5) * 10,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.02,
            duration: 1200,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0.98,
            duration: 1200,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => moveRandomly());
    };

    moveRandomly();
  }, []);

  return (
    <View className="absolute inset-0 items-center justify-center">
      <Animated.View
        style={{
          width: BASE_W,
          height: BASE_H,
          transform: [{ translateX: posX }, { translateY: posY }, { scale }],
        }}
      >
        {/* frame principal */}
        <View
          style={{
            flex: 1,
            borderWidth: 2,
            borderColor: "#22c55e",
            borderRadius: 22,
          }}
        />

        {/* glow interno */}
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 22,
            borderWidth: 1,
            borderColor: "rgba(34,197,94,0.4)",
          }}
        />
      </Animated.View>
    </View>
  );
};
