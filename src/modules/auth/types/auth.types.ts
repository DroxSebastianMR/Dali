export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthUser {
  id: string;
  email: string;
  nombre?: string;
  roles?: string[];
}
