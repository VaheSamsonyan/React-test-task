import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setCredentials } from "@modules/auth/model/auth-slice";
import type { RootState } from "@app/store/store.ts";
import { useAppDispatch } from "@shared/hooks/use-app-dispatch.ts";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state?.auth?.user);
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (user && token) dispatch(setCredentials({ user, token }));
  }, []);

  return {
    user,
    isLoggedIn: Boolean(user),
  };
};
