import { API_URL } from "@/constants";
import { ICreateTask, IUpdateTask } from "@/types";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const fetchTasks = async (columnId: string) => {
  try {
    const response = await axios.get(`${API_URL}tasks/column/${columnId}`);
    return response.data;
  } catch (error) {
    toast.error((error as AxiosError).message);
    throw error;
  }
};

export const fetchTask = async (taskId: string) => {
  try {
    const response = await axios.get(`${API_URL}tasks/${taskId}`);
    return response.data;
  } catch (error) {
    toast.error((error as AxiosError).message);
    throw error;
  }
};

export const createTask = async (columnId: string, body: ICreateTask) => {
  try {
    const response = await axios.post(`${API_URL}tasks/${columnId}`, body);
    return response.data;
  } catch (error) {
    toast.error((error as AxiosError).message);
    throw error;
  }
};

export const updateTask = async (columnId: string, body: IUpdateTask) => {
  try {
    const response = await axios.put(`${API_URL}tasks/${columnId}`, body);
    return response.data;
  } catch (error) {
    toast.error((error as AxiosError).message);
    throw error;
  }
};

export const deleteTask = async (taskId: string) => {
  try {
    const response = await axios.delete(`${API_URL}tasks/${taskId}`);
    return response.data;
  } catch (error) {
    toast.error((error as AxiosError).message);
    throw error;
  }
};
