import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import authService from "@modules/auth/services";
import type {
  AuthState,
  LoginPost,
  LoginResponse,
  RegisterFormValues,
} from "@modules/auth/types";
import { getStorageItem } from "@shared/utils/local-storage.ts";

const initialAuthData = getStorageItem("auth");
const initialUserData = initialAuthData?.user;

const initialState: AuthState = {
  user: initialUserData ?? null,
  token: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: null,
  logoutModalVisible: false,
};

export const signUpUser = createAsyncThunk(
  "auth/sign-up",
  async (user: RegisterFormValues, thunkAPI) => {
    try {
      return await authService.signUp(user);
    } catch (error) {
      const message = error?.toString();
      return thunkAPI.rejectWithValue(message ?? "Sign up failed");
    }
  },
);

export const signIn = createAsyncThunk(
  "auth/login",
  async (credentials: LoginPost, thunkAPI) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      const message = error?.toString();
      return thunkAPI.rejectWithValue(message ?? "Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setCredentials(state, action: PayloadAction<LoginResponse>) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    showLogoutModal(state) {
      state.logoutModalVisible = true;
    },
    hideLogoutModal(state) {
      state.logoutModalVisible = false;
    },
  },
  extraReducers(builder) {
    builder;
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { resetAuth, setCredentials, showLogoutModal, hideLogoutModal } =
  authSlice.actions;
export default authSlice.reducer;
