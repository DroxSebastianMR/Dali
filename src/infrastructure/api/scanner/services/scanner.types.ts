import { ScannerResult } from "@/src/modules/scanner/types/scanner.types";

export type ScannerApiResponse = {
  success: boolean;
  data: {
    data: ScannerResult;
  };
};

export type ScannerResponse = {
  result: ScannerResult;
};
