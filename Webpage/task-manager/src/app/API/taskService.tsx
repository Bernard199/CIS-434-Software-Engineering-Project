import axios from 'axios';

const API_BASE_URL = 'http://10.0.0.52:8000';  // Adjust to your API base URL or move to an environment variable.

export interface Task {
  taskId?: number;
  title: string;
  description?: string;
  priority?: number;
  deadline?: string;
  status?: string;
  user_id: number;
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

export const getTask = async (taskId: number): Promise<Task> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch task:', error);
    throw error;
  }
};

export const createTask = async (taskData: Task): Promise<Task> => {
  try {
    // Convert priority to a number to match the expected type
    const priority = typeof taskData.priority === 'string' ? parseInt(taskData.priority, 10) : taskData.priority;

    const response = await axios.post(`${API_BASE_URL}/tasks/`, {
      title: taskData.title,
      description: taskData.description,
      user_id: taskData.user_id, // Ensure user_id is a valid number
      priority: priority ?? 1, // Default to 1 if not provided
      deadline: taskData.deadline ? new Date(taskData.deadline).toISOString() : null,
      status: taskData.status,
    });
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
