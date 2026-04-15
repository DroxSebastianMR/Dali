import { useAppState } from "@/src/app/runtime/AppStateProvider";
import { StubScreen } from "@/src/modules/app-shell/screens/StubScreen";

export const OfflineScreen = () => {
  const { retryBootstrap } = useAppState();

  return (
    <StubScreen
      title="Sin conexión"
      message="Revisa tu conexión a internet e inténtalo nuevamente."
      showRetry
      onRetry={() => {
        retryBootstrap?.();
      }}
    />
  );
};
