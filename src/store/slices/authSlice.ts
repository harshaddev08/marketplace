import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthService,
  LoginData,
  RegisterData,
  User,
} from "@/services/authServices";
import { AxiosError } from "axios";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: true,
  error: null,
};

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: LoginData, { rejectWithValue }) => {
    try {
      const response = await AuthService.login(data);
      console.log("Redux Login Payload:", response);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Login failed",
      );
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(data);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const restoreUser = createAsyncThunk(
  "auth/restore",
  async (_, { rejectWithValue }) => {
    if (typeof window === "undefined") return rejectWithValue("Server side");

    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        return { token, user };
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return rejectWithValue("Invalid user data");
      }
    }
    return rejectWithValue("No session");
  },
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  AuthService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action: any) => {
      state.loading = false;
      console.log("Login Fulfilled Payload:", action.payload);

      // Handle potential variations in API response structure
      const payload = action.payload;
      const user = payload.user || payload.data?.user || payload.data;
      const token = payload.token || payload.data?.token;

      state.user = user;
      state.token = token;

      if (typeof window !== "undefined") {
        if (token) localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action: any) => {
      state.loading = false;
      console.log("Register Fulfilled Payload:", action.payload);

      const payload = action.payload;
      const user = payload.user || payload.data?.user || payload.data;
      const token = payload.token || payload.data?.token;

      state.user = user;
      state.token = token;

      if (typeof window !== "undefined") {
        if (token) localStorage.setItem("token", token);
        if (user) localStorage.setItem("user", JSON.stringify(user));
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Restore
    builder.addCase(restoreUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(restoreUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(restoreUser.rejected, (state) => {
      state.loading = false;
      state.user = null;
      state.token = null;
    });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.loading = false; // Ensure loading is false
    });
  },
});

export default authSlice.reducer;
