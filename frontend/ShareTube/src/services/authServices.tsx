import api from "./api";
import { LoginInput, RegisterInput, User } from "../types/user";

export const register = async (input: RegisterInput): Promise<User> => {
  const response = await api.post<{ message: string }>("/register", input);
  return response.data as unknown as User; // APIの実際のレスポンス形式に合わせて調整が必要かもしれません
};

export const login = async (
  input: LoginInput
): Promise<{ token: string; message: string }> => {
  const response = await api.post<{ token: string; message: string }>(
    "/login",
    input
  );
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post("/logout");
  localStorage.removeItem("token");
};

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<User>("/users/me"); // このエンドポイントは仮定です。実際のAPIに合わせて調整してください
    return response.data;
  } catch (error) {
    return null;
  }
};
