import api from "./api";
import { Class } from "../types/class";

export const classService = {
  createClass: async (
    classData: Omit<Class, "id" | "created_at" | "updated_at">
  ): Promise<Class> => {
    try {
      const response = await api.post(`/class`, classData);
      return response.data;
    } catch (error) {
      console.error("Error creating class:", error);
      throw error;
    }
  },

  getClasses: async (): Promise<Class[]> => {
    try {
      const response = await api.get(`/classes`);
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
    }
  },

};