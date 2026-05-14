export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthUser {
  id: string;

  email: string;

  first_name?: string;

  last_name?: string;

  phone?: string | null;

  photo_url?: string | null;

  roles?: string[];
}
