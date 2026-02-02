import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  loginUser,
  registerUser,
  logoutUser,
  restoreUser,
} from "../store/slices/authSlice";
import { LoginData, RegisterData } from "@/services/authServices";
import { useEffect } from "react";

import { useRouter } from "next/navigation";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, loading, error, token } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    // Only restore if not already authenticated (token null) and not currently loading (initial state might be true)
    // Actually, slice initial state loading is true.
    // We should trigger restore on mount once.
    if (!token && loading) {
      // Simple check, might need refinement
      dispatch(restoreUser());
    }
  }, [dispatch, token, loading]);

  const login = async (data: LoginData) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.rejected.match(result)) {
      throw new Error((result.payload as string) || "Login failed");
    }
    router.push("/");
  };

  const register = async (data: RegisterData) => {
    const result = await dispatch(registerUser(data));
    if (registerUser.rejected.match(result)) {
      throw new Error((result.payload as string) || "Registration failed");
    }
    router.push("/");
  };

  const logout = () => {
    dispatch(logoutUser());
    router.push("/auth");
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };
};
