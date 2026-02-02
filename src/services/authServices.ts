import { apiService } from "./apiService";

export interface User {
  id: string;
  name: string;
  email: string;
  roles: string[];
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const AuthService = {
  async register(data: RegisterData) {
    const response = await apiService.post<LoginResponse>(
      "/auth/register",
      data,
    );
    return response.data;
  },

  async login(data: LoginData) {
    const response = await apiService.post<LoginResponse>("/auth/login", data);
    return response.data;
  },

  async getCurrentUser() {
    const response = await apiService.get<User>("/auth/me");
    return response.data;
  },

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
