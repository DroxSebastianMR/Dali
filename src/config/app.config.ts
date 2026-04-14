import Constants from "expo-constants";

export const APP_CONFIG = {
  PLATFORM: "ANDROID",
  VERSION: Constants.expoConfig?.version ?? "0.1.0",
  NAME: Constants.expoConfig?.name ?? "dali-app",
};
