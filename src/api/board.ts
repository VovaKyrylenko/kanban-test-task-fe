import { API_URL } from "@/constants";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const fetchBoard = async (boardId: string) => {
  try {
    const response = await axios.get(`${API_URL}boards/${boardId}`);
    return response.data;
  } catch (error) {
    toast.error((error as AxiosError).message);
    throw error;
  }
};

export const createBoard = async (name: string) => {
  try {
    const response = await axios.post(`${API_URL}boards`, { name });
    return response.data;
  } catch (error) {
    toast.error((error as AxiosError).message);
    throw error;
  }
};

export const updateBoard = async (boardId: string, name: string) => {
  try {
    const response = await axios.put(`${API_URL}boards/${boardId}`, { name });
    return response.data;
  } catch (error) {
    console.log("error:", error);
    toast.error((error as AxiosError).message);
    throw error;
  }
};

export const deleteBoard = async (boardId: string) => {
  try {
    const response = await axios.delete(`${API_URL}boards/${boardId}`);
    return response.data;
  } catch (error) {
    toast.error((error as AxiosError).message);
    throw error;
  }
};
