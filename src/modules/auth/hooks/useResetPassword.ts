import { resetPassword } from "@/src/domain/auth/auth.usecase";
import { useState } from "react";
import { useToast } from "../../system/ui/hooks/useToast";

type ResetPasswordForm = {
  newPassword: string;
  confirmPassword: string;
};

export const useResetPassword = (token: string) => {
  const { show } = useToast();

  const [form, setForm] = useState<ResetPasswordForm>({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (field: keyof ResetPasswordForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validate = (): string | null => {
    if (!form.newPassword.trim()) {
      return "Ingresa una Contraseña";
    }

    if (form.newPassword.length < 8) {
      return "Mínimo 8 caracteres";
    }

    if (form.newPassword !== form.confirmPassword) {
      return "Las contraseñas no coinciden";
    }

    return null;
  };

  const handleError = (error: any) => {
    if (error?.message === "INVALID_TOKEN") {
      return show("El código expiró o no es válido", "error");
    }

    if (error?.message === "Network Error") {
      return show("Sin conexión a internet", "error");
    }

    return show("No se pudo actualizar la contraseña", "error");
  };

  const handleResetPassword = async (): Promise<boolean> => {
    const errorMessage = validate();

    if (errorMessage) {
      show(errorMessage, "error");
      return false;
    }

    try {
      setLoading(true);

      await resetPassword(token, form.newPassword);

      show("Contraseña Actualizada Correctamente", "success");

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
    handleResetPassword,
  };
};
