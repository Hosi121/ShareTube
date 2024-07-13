import api from "./api";
import { User } from "../types/user";

export const getUserProfile = async (userId: string): Promise<User | null> => {
    try {
      const response = await api.get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      throw error;
    }
  };

  export const updateUserProfile = async (userId: string, userData: Partial<User>): Promise<User> => {
    try {
      const response = await api.put<User>(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error("Failed to update user profile:", error);
      throw error;
    }
  };

  export const fetchUserById = async (userId: string): Promise<User> => {
    try {
      const response = await api.get<User>(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw error;
    }
  };