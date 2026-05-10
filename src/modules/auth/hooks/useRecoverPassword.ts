import { recoverPassword } from "@/src/domain/auth/auth.usecase";
import { useToast } from "@/src/modules/system/ui/hooks/useToast";
import { useState } from "react";

type RecoverPasswordForm = {
  email: string;
};

export const useRecoverPassword = () => {
  const { show } = useToast();

  const [form, setForm] = useState<RecoverPasswordForm>({
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (field: keyof RecoverPasswordForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): string | null => {
    if (!form.email.trim()) {
      return "Completa el campo de correo";
    }

    return null;
  };

  const handleError = (error: any) => {
    if (error?.message === "INVALID_EMAIL") {
      return show("Correo inválido", "error");
    }

    if (error?.message === "Network Error") {
      return show("Sin conexión a Internet", "error");
    }

    return show("Error inesperado", "error");
  };

  const handleRecoverPassword = async () => {
    const errorMessage = validate();
    if (errorMessage) return show(errorMessage, "error");

    try {
      setLoading(true);
      await recoverPassword(form.email);

      show(
        "Si el correo existe, se enviará un mensaje de recuperación",
        "success",
      );
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    onChange,
    handleRecoverPassword,
  };
};
