import axios from "axios";
import { API_URL } from "@/constants";

export const getBoard = async (searchQuery: string) => {
  try {
    const idResponse = await axios.get(`${API_URL}/api/boards/${searchQuery}`);
    if (idResponse.data) {
      return idResponse.data;
    }
  } catch (error) {
    console.error("Error getting board by ID:", error);
  }

  return null;
};
