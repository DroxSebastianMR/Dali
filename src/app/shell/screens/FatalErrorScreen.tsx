import { StubScreen } from "@/src/app/shell/screens/StubScreen/StubScreen";

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
