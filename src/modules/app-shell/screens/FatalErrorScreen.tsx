import { StubScreen } from "@/src/modules/app-shell/screens/StubScreen";

export const FatalErrorScreen = () => {
  return (
    <StubScreen
      title="Error crítico"
      message="Ocurrió un problema inesperado. Intenta nuevamente."
      showRetry
      onRetry={() => {
        console.log("Retry app");
      }}
    />
  );
};
