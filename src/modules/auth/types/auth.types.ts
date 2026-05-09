export type AuthStatus = "checking" | "authenticated" | "unauthenticated";

export interface AuthUser {
  id: string;

  email: string;

  nombre?: string;

  apellido?: string;

  telefono?: string | null;

  photoUrl?: string | null;

  roles?: string[];
}
