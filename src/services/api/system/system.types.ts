export type SystemMode = "OK" | "MAINTENANCE" | "UPDATE_REQUIRED";

export type BackendStatus = "OK" | "MAINTENANCE" | "OFFLINE";

export interface SystemStatus {
  mode: SystemMode;
  timestamp: string;
  environment: string;

  backend: {
    name: string;
    version: string;
    status: BackendStatus;
  };

  app: {
    currentVersion: string;
    minSupportedVersion: string;
    clientVersion: string | null;
    update: {
      required: boolean;
      type: "PATCH" | "MINOR" | "MAJOR";
      message: string;
      storeUrl: string | null;
    } | null;
  };

  maintenance: {
    enabled: boolean;
    message: string | null;
    estimatedEnd: string | null;
  };
}
