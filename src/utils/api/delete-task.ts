import axios from "axios";
import { API_URL } from "@/constants";

export async function deleteTask(taskId: string) {
  try {
    const response = await axios.delete(`${API_URL}/api/tasks/${taskId}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
