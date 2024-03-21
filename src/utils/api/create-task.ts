import axios from "axios";
import { API_URL } from "@/constants";
import { TaskStatus } from "@/types";

export async function createTask(
  boardId: string,
  title: string,
  description: string,
  status: TaskStatus
) {
  try {
    const response = await axios.post(`${API_URL}/api/tasks/${boardId}`, {
      title: title,
      description: description,
      status: status,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error creating task:", error);
  }
}
