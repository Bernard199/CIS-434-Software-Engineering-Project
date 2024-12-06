import axios from 'axios';

const API_BASE_URL = 'http://10.0.0.52:8000';  

export interface Task {
  taskId?: number;
  title: string;
  description?: string;
  priority?: number;
  deadline?: string;
  status?: string;
  category?: string;
  user_id?: number;
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData: Task): Promise<Task> => {
  try {
    // Get user_id from local storage
    const user_id = localStorage.getItem('user_id');
    if (!user_id) {
      throw new Error('User ID is not available. Please log in again.');
    }

    // Attach the user_id to the task data
    const taskWithUser = {
      ...taskData,
      user_id: parseInt(user_id, 10),
    };

    // Log the payload being sent in the POST request
    console.log("POST Request to /tasks/ with payload:", taskWithUser);

    const response = await axios.post(`${API_BASE_URL}/tasks/`, taskWithUser, {
      headers: getAuthHeaders(),
    });

    // Log the response data for debugging purposes
    console.log("POST Response from /tasks/:", response.data);

    return response.data;
  } catch (error) {
    // Log the error with detailed information
    if (axios.isAxiosError(error)) {
      console.error("Failed to create task:", error.response?.data);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};

export const updateTask = async (taskId: number, taskData: Partial<Task>): Promise<Task> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId: number): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error('Failed to delete task:', error);
    throw error;
  }
};
