import type { UserByIdResponse } from "@modules/user/types";

export interface AuthState {
  user: UserByIdResponse | null;
  token: string | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: string | null | unknown;
  logoutModalVisible: boolean;
}

export interface LoginPost {
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginResponse {
  user: UserByIdResponse;
  token: string;
}

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  password: string;
}
