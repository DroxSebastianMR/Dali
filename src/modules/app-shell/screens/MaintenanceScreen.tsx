import { useAppState } from "@/src/app/runtime/AppStateProvider";
import { StubScreen } from "@/src/modules/app-shell/screens/StubScreen";

export const MaintenanceScreen = () => {
  const { retryBootstrap } = useAppState();

  return (
    <StubScreen
      title="Mantenimiento"
      message="Estamos realizando mejoras. Vuelve en unos minutos."
      showRetry
      onRetry={async () => {
        if (retryBootstrap) {
          await retryBootstrap();
        }
      }}
    />
  );
};
