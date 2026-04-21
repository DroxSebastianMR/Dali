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
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const validate = (): boolean => {
    if (!form.email.trim() || !form.password.trim()) {
      show("Completa todos los campos", "error");
      return false;
    }

    if (!form.email.includes("@")) {
      show("Correo inválido", "error");
      return false;
    }

    if (form.password.length < 6) {
      show("La contraseña debe tener al menos 6 caracteres", "error");
      return false;
    }

    return true;
  };
  const handleError = (error: unknown) => {
    console.error("Login error:", error);

    show("Credenciales incorrectas", "error");
  };
  const handleLogin = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await login(form.email.trim(), form.password);

      show("Bienvenido 👋", "success");
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
