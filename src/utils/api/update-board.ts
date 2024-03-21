import axios from "axios";
import { API_URL } from "@/constants";

export async function updateBoard(boardId: string, body: any) {
  try {
    const response = await axios.put(`${API_URL}/api/boards/${boardId}`, {
      ...body,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error updating board:", error);
  }
}
