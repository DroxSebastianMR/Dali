import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";

const HAPTIC_DELAYS = {
  HEAVY: 80,
  MEDIUM: 120,
  LIGHT: 200,
  PAUSE: 400,
};

export const useHapticsLoop = () => {
  const isRunning = useRef(true);

  useEffect(() => {
    run();

    return () => {
      isRunning.current = false;
    };
  }, []);

  const run = async () => {
    while (isRunning.current) {
      await sequence();
    }
  };

  const sequence = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await sleep(HAPTIC_DELAYS.HEAVY);

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await sleep(HAPTIC_DELAYS.MEDIUM);

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await sleep(HAPTIC_DELAYS.LIGHT);

    await sleep(HAPTIC_DELAYS.PAUSE);
  };
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
