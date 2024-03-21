import axios from "axios";
import { API_URL } from "@/constants";

export async function createBoard(name: string) {
  try {
    const response = await axios.post(`${API_URL}/api/boards/`, {
      name: name,
    });
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Error creating board:", error);
  }
}
