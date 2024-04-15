import { API_URL } from "@/constants";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const fetchColumns = async (boardId: string) => {
  try {
    const response = await axios.get(`${API_URL}columns/${boardId}`);
    return response.data;
  } catch (error) {
    toast.error((error as AxiosError).message);
    throw error;
  }
};
