import { CameraView } from "expo-camera";
import * as FileSystem from "expo-file-system/legacy";
import { useState } from "react";

import { analyzeImageUseCase } from "@/src/domain/scanner/scanner.usecase";

export const useScannerCapture = (
  cameraRef: React.RefObject<CameraView | null>,
) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const takePhoto = async () => {
    if (!cameraRef.current || isAnalyzing) {
      return;
    }

    try {
      setIsAnalyzing(true);

      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.7,
        skipProcessing: true,
      });

      if (!photo?.uri) {
        return;
      }

      console.log("📸 Foto tomada:", photo.uri);

      const result = await analyzeImageUseCase({
        uri: photo.uri,
        name: "scanner.jpg",
        type: "image/jpeg",
      });

      console.log("✅ Resultado:");
      console.log(JSON.stringify(result, null, 2));

      await FileSystem.deleteAsync(photo.uri, {
        idempotent: true,
      });

      console.log("🗑️ Foto eliminada");

      return result;
    } catch (error) {
      console.error("❌ Error analizando imagen:", error);
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    isAnalyzing,
    takePhoto,
  };
};
