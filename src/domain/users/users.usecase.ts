import { usersService } from "@/src/infrastructure/api/users/services/users.service";

import { MeResponse } from "@/src/infrastructure/api/users/services/users.types";

export const getCurrentUser = async (): Promise<MeResponse> => {
  return await usersService.me();
};
