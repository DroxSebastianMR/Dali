export type BootstrapStatus =
  | "loading"
  | "ready"
  | "offline"
  | "maintenance"
  | "update-required"
  | "update-optional"
  | "error";

interface BaseBootstrapState {
  status: BootstrapStatus;
}
export interface LoadingState extends BaseBootstrapState {
  status: "loading";
}

export interface ReadyState extends BaseBootstrapState {
  status: "ready";
}

export interface OfflineState extends BaseBootstrapState {
  status: "offline";
}

export interface ErrorState extends BaseBootstrapState {
  status: "error";
}
export interface MaintenanceState extends BaseBootstrapState {
  status: "maintenance";
  message?: string;
}
export interface UpdateRequiredState extends BaseBootstrapState {
  status: "update-required";
  url: string;
}
export interface UpdateOptionalState extends BaseBootstrapState {
  status: "update-optional";
  url: string;
}
export type BootstrapState =
  | LoadingState
  | ReadyState
  | OfflineState
  | ErrorState
  | MaintenanceState
  | UpdateRequiredState
  | UpdateOptionalState;
