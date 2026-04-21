import {
    loginWithSocialUser,
    SocialProvider,
} from "@/src/domain/auth/social.usecase";
import { useAuth } from "@/src/modules/auth/context/AuthProvider";
import { useToast } from "@/src/modules/system/ui/hooks/useToast";
import { useState } from "react";

const getMockToken = async (provider: SocialProvider): Promise<string> => {
  await new Promise((r) => setTimeout(r, 500));

  return `${provider}-mock-token`;
};

export const useSocialLogin = () => {
  const { show } = useToast();
  const { setUser, setStatus } = useAuth() as any;
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = async (provider: SocialProvider) => {
    try {
      setLoading(true);

      const token = await getMockToken(provider);
      const response = await loginWithSocialUser(provider, token);
      setUser(response.user);
      setStatus("authenticated");

      show("Bienvenido 👋", "success");
    } catch (error) {
      console.error("Social login error:", error);
      show("Error al iniciar sesión social", "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    handleSocialLogin,
    loading,
  };
};
