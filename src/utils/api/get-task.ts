import axios from "axios";
import { API_URL } from "@/constants";

export const getTask = async (taskId: string) => {
  try {
    const idResponse = await axios.get(`${API_URL}/api/tasks/${taskId}`);
    if (idResponse.data) {
      return idResponse.data;
    }
  } catch (error) {
    console.error("Error getting task by ID:", error);
  }

  return null;
};
