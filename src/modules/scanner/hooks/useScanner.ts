import { useCameraPermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { PanResponder } from "react-native";

const MIN_ZOOM = 0;
const MAX_ZOOM = 1;
const ZOOM_SENSITIVITY = 0.002;
const SMOOTHING_FACTOR = 0.15;

export const useScanner = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [zoom, setZoom] = useState(0);

  const initialDistance = useRef(0);
  const initialZoom = useRef(0);
  const currentZoom = useRef(0);

  useEffect(() => {
    currentZoom.current = zoom;
  }, [zoom]);

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const getDistance = (touches: any[]) => {
    if (touches.length < 2) return 0;

    const [a, b] = touches;
    const dx = a.pageX - b.pageX;
    const dy = a.pageY - b.pageY;

    return Math.sqrt(dx * dx + dy * dy);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) =>
        gestureState.numberActiveTouches === 2,

      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.numberActiveTouches === 2,

      onPanResponderGrant: (event) => {
        initialDistance.current = getDistance(event.nativeEvent.touches);
        initialZoom.current = currentZoom.current;
      },

      onPanResponderMove: (event) => {
        const touches = event.nativeEvent.touches;

        if (touches.length < 2 || initialDistance.current === 0) return;

        const currentDistance = getDistance(touches);
        const distanceDelta = currentDistance - initialDistance.current;

        const rawZoom = initialZoom.current + distanceDelta * ZOOM_SENSITIVITY;

        const targetZoom = clamp(rawZoom, MIN_ZOOM, MAX_ZOOM);

        const smoothedZoom =
          currentZoom.current +
          (targetZoom - currentZoom.current) * SMOOTHING_FACTOR;

        currentZoom.current = smoothedZoom;
        setZoom(smoothedZoom);
      },

      onPanResponderRelease: () => {
        initialDistance.current = 0;
      },

      onPanResponderTerminate: () => {
        initialDistance.current = 0;
      },
    }),
  ).current;

  return {
    permission,
    requestPermission,
    zoom,
    panHandlers: panResponder.panHandlers,
  };
};
