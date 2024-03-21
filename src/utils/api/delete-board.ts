import axios from "axios";
import { API_URL } from "@/constants";

export async function deleteBoard(boardId: string) {
  try {
    const response = await axios.delete(`${API_URL}/api/boards/${boardId}`);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting board:", error);
  }
}
