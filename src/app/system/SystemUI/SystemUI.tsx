import { useSystemUI } from "@/src/app/system/SystemUI/hooks/useSystemUI";
import { GlobalLoader } from "@/src/app/system/SystemUI/overlays/GlobalLoader";
import { GlobalModal } from "@/src/app/system/SystemUI/overlays/GlobalModal";
import { GlobalToast } from "@/src/app/system/SystemUI/overlays/GlobalToast";

export const SystemUI = () => {
  const { state } = useSystemUI();

  return (
    <>
      {state.loading && <GlobalLoader />}
      {state.toast && <GlobalToast toast={state.toast} />}
      {state.modal && <GlobalModal>{state.modal}</GlobalModal>}
    </>
  );
};
