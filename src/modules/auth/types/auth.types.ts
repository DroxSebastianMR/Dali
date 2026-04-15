export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthUser {
  id: string;
  email: string;
}
