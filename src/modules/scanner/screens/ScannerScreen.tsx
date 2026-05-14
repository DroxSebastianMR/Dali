import { CameraView } from "expo-camera";
import React, { useRef } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { ScannerFrame } from "@/src/modules/scanner/components/ScannerFrame";
import { ScannerHeader } from "@/src/modules/scanner/components/ScannerHeader";
import { ZoomIndicator } from "@/src/modules/scanner/components/ZoomIndicator";
import { useScanner } from "@/src/modules/scanner/hooks/useScanner";
import { PaperTrackingOverlay } from "../components/PaperDetectorOverlay";

export const ScannerScreen = () => {
  const cameraRef = useRef<CameraView>(null);

  const { permission, requestPermission, zoom, panHandlers } = useScanner();
  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.7,
    });
    console.log("📸 Foto tomada:", photo.uri);
  };

  if (!permission) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-6">
        <Text className="text-white text-center text-lg mb-5">
          Necesitamos permiso para acceder a la cámara
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          className="bg-green-500 px-6 py-4 rounded-2xl"
        >
          <Text className="text-white font-semibold">Permitir cámara</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black" {...panHandlers}>
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
        zoom={zoom}
        autofocus="on"
      />

      <ScannerHeader />
      <PaperTrackingOverlay />
      <ScannerFrame />
      <ZoomIndicator zoom={zoom} />

      <View className="absolute bottom-10 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={takePhoto}
          activeOpacity={0.8}
          className="w-20 h-20 rounded-full border-4 border-white bg-green-500 items-center justify-center shadow-lg"
        >
          {" "}
          <View className="w-14 h-14 rounded-full bg-white" />
        </TouchableOpacity>

        <Text className="text-white mt-3 text-sm opacity-70">
          Tocar para escanear
        </Text>
      </View>
    </View>
  );
};
