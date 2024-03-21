import axios from "axios";
import { API_URL } from "@/constants";

export async function updateTask(taskId: string, body: any) {
  try {
    const response = await axios.put(`${API_URL}/api/tasks/${taskId}`, {
      ...body,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
}
