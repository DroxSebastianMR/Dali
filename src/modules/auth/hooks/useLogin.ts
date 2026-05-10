import { useAuth } from "@/src/modules/auth/context/AuthProvider";
import { useToast } from "@/src/modules/system/ui/hooks/useToast";
import { useState } from "react";

type LoginForm = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const { login } = useAuth();
  const { show } = useToast();

  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const onChange = (field: keyof LoginForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = (): string | null => {
    if (!form.email.trim() || !form.password.trim()) {
      return "Completa todos los campos";
    }

    if (form.password.length < 6) {
      return "Mínimo 6 caracteres";
    }

    return null;
  };

  const handleError = (error: any) => {
    if (error?.message === "INVALID_EMAIL") {
      return show("Correo inválido", "error");
    }

    if (error?.response?.status === 401) {
      return show("Credenciales incorrectas", "error");
    }

    if (error?.message === "Network Error") {
      return show("Sin conexión a internet", "error");
    }

    return show("Error inesperado", "error");
  };

  const handleLogin = async () => {
    const errorMessage = validate();
    if (errorMessage) return show(errorMessage, "error");

    try {
      setLoading(true);
      await login(form.email, form.password);
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
    handleLogin,
  };
};
