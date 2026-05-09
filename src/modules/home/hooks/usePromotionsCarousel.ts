import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
    Dimensions,
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
} from "react-native";

import { Promotion } from "@/src/modules/home/components/PromotionsCarousel";

const { width } = Dimensions.get("window");

const AUTO_PLAY_INTERVAL = 4000;

export const usePromotionsCarousel = (data: Promotion[]) => {
  const flatListRef = useRef<FlatList>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const safeData = useMemo(() => data ?? [], [data]);

  const scrollToIndex = useCallback((index: number) => {
    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });
  }, []);

  const stopAutoPlay = useCallback(() => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);

    intervalRef.current = null;
  }, []);

  const startAutoPlay = useCallback(() => {
    if (safeData.length <= 1) return;

    stopAutoPlay();

    intervalRef.current = setInterval(() => {
      setActiveIndex((currentIndex) => {
        const nextIndex =
          currentIndex >= safeData.length - 1 ? 0 : currentIndex + 1;

        scrollToIndex(nextIndex);

        return nextIndex;
      });
    }, AUTO_PLAY_INTERVAL);
  }, [safeData.length, scrollToIndex, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();

    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  const handleMomentumEnd = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(event.nativeEvent.contentOffset.x / width);

      setActiveIndex(index);
    },
    [],
  );

  const handleScrollToIndexFailed = useCallback((info: any) => {
    requestAnimationFrame(() => {
      flatListRef.current?.scrollToIndex({
        index: info.index,
        animated: true,
      });
    });
  }, []);

  return {
    flatListRef,

    activeIndex,

    safeData,

    startAutoPlay,

    stopAutoPlay,

    handleMomentumEnd,

    handleScrollToIndexFailed,
  };
};
