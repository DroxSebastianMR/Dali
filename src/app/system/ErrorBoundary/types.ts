import { ErrorType } from "@/src/app/system/ErrorBoundary/ErrorTypes";

export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
  errorType?: ErrorType;
};
