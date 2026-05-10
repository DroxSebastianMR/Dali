import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

type Props = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: any;
};

export const Skeleton = ({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
}: Props) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();

    return () => loop.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#E5E7EB",
          opacity,
        },
        style,
      ]}
    />
  );
};
