import axios from 'axios';

const API_BASE_URL = 'http://10.0.0.52:8000';  

export interface Task {
  taskId?: number;
  title: string;
  description?: string;
  priority?: number;
  deadline?: string;
  status?: string;
}

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData: Task): Promise<Task> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/tasks/`, taskData);
    return response.data;
  } catch (error) {
    console.error('Failed to create task:', error);
    throw error;
  }
};

export const updateTask = async (taskId: number, taskData: Partial<Task>): Promise<Task> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: number): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};
