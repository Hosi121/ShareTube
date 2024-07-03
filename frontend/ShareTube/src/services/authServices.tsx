import api from "./api";
import { AuthResponse, LoginInput, RegisterInput, User } from "../types/user";

export const login = async (LoginInput: LoginInput): Promise<User> => {
  const response = await api.post<AuthResponse>("auth/login", LoginInput);
  localStorage.setItem("token", response.data.token);
  return response.data.user;
};
export const register = async (registerInput: RegisterInput): Promise<User> => {
  const response = await api.post<AuthResponse>(
    "/auth/register",
    registerInput
  );
  localStorage.setItem("token", response.data.token);
  return response.data.user;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
  localStorage.removeItem("token");
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};
