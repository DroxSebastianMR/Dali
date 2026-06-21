import { scannerService } from "@/src/infrastructure/api/scanner/services/scanner.service";

import {
    AnalyzeImageInput,
    ScannerResult,
} from "@/src/modules/scanner/types/scanner.types";

export const analyzeImageUseCase = async ({
  uri,
  name = "scanner.jpg",
  type = "image/jpeg",
}: AnalyzeImageInput): Promise<ScannerResult> => {
  if (!uri.trim()) {
    throw new Error("IMAGE_REQUIRED");
  }

  const formData = new FormData();

  formData.append("image", {
    uri,
    name,
    type,
  } as any);

  const { result } = await scannerService.analyzeImage(formData);

  if (!result) {
    throw new Error("INVALID_SCANNER_RESPONSE");
  }

  return result;
};
