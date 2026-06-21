export type AnalyzeImageInput = {
  uri: string;
  name?: string;
  type?: string;
};

export type ScannerProduct = {
  raw_text: string;
  normalized_name: string;
  brand: string | null;
  quantity: number | null;
  unit: string | null;
  estimated_price: number | null;
  currency: string | null;
  confidence: number;
};

export type ScannerSummary = {
  total_products: number;
  confidence_average: number;
};

export type ScannerResult = {
  detected_language: string;
  has_handwriting: boolean;
  products: ScannerProduct[];
  unrecognized_lines: string[];
  summary: ScannerSummary;
};
