import { CameraView } from "expo-camera";
import React, { useRef } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { PaperTrackingOverlay } from "@/src/modules/scanner/components/PaperDetectorOverlay";
import { ScannerFrame } from "@/src/modules/scanner/components/ScannerFrame";
import { ScannerHeader } from "@/src/modules/scanner/components/ScannerHeader";
import { ZoomIndicator } from "@/src/modules/scanner/components/ZoomIndicator";
import { useScanner } from "@/src/modules/scanner/hooks/useScanner";
import { useScannerCapture } from "@/src/modules/scanner/hooks/useScannerCapture";

export const ScannerScreen = () => {
  const cameraRef = useRef<CameraView>(null);
  const { permission, requestPermission, zoom, panHandlers } = useScanner();
  const { isAnalyzing, takePhoto } = useScannerCapture(cameraRef);

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
        <Text className="mb-5 text-center text-lg text-white">
          Necesitamos permiso para acceder a la cámara
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          className="rounded-2xl bg-green-500 px-6 py-4"
        >
          <Text className="font-semibold text-white">Permitir cámara</Text>
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
          disabled={isAnalyzing}
          activeOpacity={0.8}
          className="h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-green-500 shadow-lg"
        >
          {isAnalyzing ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <View className="h-14 w-14 rounded-full bg-white" />
          )}
        </TouchableOpacity>

        <Text className="mt-3 text-sm text-white opacity-70">
          {isAnalyzing ? "Analizando imagen..." : "Tocar para escanear"}
        </Text>
      </View>
    </View>
  );
};
