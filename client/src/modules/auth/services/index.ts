import mainApiInstance from "@shared/api";
import type {
  LoginPost,
  LoginResponse,
  RegisterFormValues,
} from "@modules/auth/types";
import {
  removeStorageItem,
  setStorageItem,
} from "@shared/utils/local-storage.ts";

const authService = {
  login: async (credentials: LoginPost): Promise<LoginResponse> => {
    const res = await mainApiInstance.post("/auth/login", credentials);
    if (res.data) {
      setStorageItem("auth", res.data);
    }
    return res.data;
  },

  signUp: async (data: RegisterFormValues) => {
    const res = await mainApiInstance.post("/auth/sign-up", data);

    return res.data;
  },

  logout: async () => {
    setStorageItem("auth", null);
    removeStorageItem("auth");
  },
};

export default authService;
