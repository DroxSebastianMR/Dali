import { scannerService } from "@/src/infrastructure/api/scanner/services/scanner.service";

export const analyzeImageUseCase = async (file: {
  uri: string;
  name?: string;
  type?: string;
}) => {
  if (!file?.uri) {
    throw new Error("IMAGE_REQUIRED");
  }

  const formData = new FormData();

  formData.append("image", {
    uri: file.uri,
    name: file.name ?? "scanner.jpg",
    type: file.type ?? "image/jpeg",
  } as any);

  const response = await scannerService.analyzeImage(formData);

  if (!response?.result) {
    throw new Error("INVALID_SCANNER_RESPONSE");
  }

  return response;
};
