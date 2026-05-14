export type UserDTO = {
  id: number;

  email: string;

  first_name: string;

  last_name: string;

  phone: string | null;

  photo_url: string | null;

  status: string;

  email_verified: boolean;

  telefono_verified: boolean;

  last_login_at: string;

  created_at: string;
};

export type RoleDTO = {
  id: number;
  name: string;
};

export type MeResponse = {
  user: UserDTO;

  authorization: {
    roles: RoleDTO[];
  };

  meta: {
    server_time: string;
    enviroment: string;
  };
};
