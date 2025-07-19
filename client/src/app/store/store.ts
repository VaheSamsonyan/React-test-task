import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@modules/auth/model/auth-slice";
import productReducer from "@modules/product/model/product-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
