import api from "./api";
import axios from "axios";
import { LoginInput, RegisterInput, User } from "../types/user";

export const register = async (input: RegisterInput): Promise<User> => {
  try {
    const response = await api.post<User>("/register", input);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const login = async (
  input: LoginInput
): Promise<{ token: string; message: string }> => {
  try {
    const response = await api.post<{ token: string; message: string }>(
      "/login",
      input
    );
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await api.post("/logout");
    localStorage.removeItem("token");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>("/users/me"); // このエンドポイントは仮定です。実際のAPIに合わせて調整してください
    return response.data;
  } catch (error) {
    console.error("Failed to fetch current user:", error);
    return null;
  }
};