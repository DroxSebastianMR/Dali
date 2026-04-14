import { SystemService } from "@/src/services/api/system/system.service";
import { SystemStatus } from "@/src/services/api/system/system.types";

export type SystemDecision =
  | { type: "OK"; status: SystemStatus }
  | { type: "MAINTENANCE"; status: SystemStatus }
  | { type: "UPDATE_REQUIRED"; status: SystemStatus };

export const checkSystemStatus = async (): Promise<SystemDecision> => {
  const status = await SystemService.getStatus();

  switch (status.mode) {
    case "MAINTENANCE":
      return { type: "MAINTENANCE", status };

    case "UPDATE_REQUIRED":
      return { type: "UPDATE_REQUIRED", status };

    case "OK":
    default:
      return { type: "OK", status };
  }
};
