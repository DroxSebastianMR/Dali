export const authStorage = {
  getToken: async (): Promise<string | null> => {
    // luego va AsyncStorage / SecureStore
    return null;
  },

  setToken: async (token: string) => {
    // guardar token
  },

  removeToken: async () => {
    // eliminar token
  },
};
