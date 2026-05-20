import { verifyResetToken } from "@/src/domain/auth/auth.usecase";
import { useToast } from "@/src/modules/system/ui/hooks/useToast";
import { useState } from "react";

type VerifyResetTokenForm = {
  token: string;
};

export const useVerifyResetToken = () => {
  const { show } = useToast();

  const [form, setForm] = useState<VerifyResetTokenForm>({
    token: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (field: keyof VerifyResetTokenForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): string | null => {
    if (!form.token.trim()) {
      return "Completa el campo de código";
    }

    return null;
  };

  const handleError = (error: any) => {
    console.error("Error al verificar el token de restablecimiento:", error);

    if (error?.message === "Network Error") {
      return show("Sin conexión a Internet", "error");
    }

    if (error?.response?.status === 400) {
      return show("El código no es válido", "error");
    }

    return show("Error inesperado", "error");
  };

  const handleVerifyResetToken = async (): Promise<boolean> => {
    const errorMessage = validate();
    if (errorMessage) {
      show(errorMessage, "error");
      return false;
    }

    try {
      setLoading(true);
      await verifyResetToken(form.token);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    onChange,
    handleVerifyResetToken,
  };
};
