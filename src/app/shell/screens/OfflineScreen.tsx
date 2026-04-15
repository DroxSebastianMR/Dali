import { useAppState } from "@/src/app/runtime/AppStateProvider";
import { StubScreen } from "@/src/app/shell/screens/StubScreen/StubScreen";

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
