import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { useAppState } from "./AppStateProvider";

export const useAppRuntime = () => {
  const { setMode } = useAppState();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected) {
        setMode("offline");
      }
    });

    return unsubscribe;
  }, []);

  return {};
};
