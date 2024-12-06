import axios from 'axios';

const API_BASE_URL = 'http://10.0.0.52:8000';  

export interface Task {

  taskId?: number;
  title: string;
  description?: string;
  category?: string;
  priority: number;
  deadline?: string;
  status?: string;
  user_id: number;

}

const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    Authorization: `Bearer ${token}`,
  };
};

// Fetch tasks for the current authenticated user
export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tasks/`, {
      headers: getAuthHeaders(),
    });

    // Transform `task_id` to `taskId`
    const transformedTasks = response.data.map((task: any) => ({
      ...task,
      taskId: task.task_id,
    }));

    return transformedTasks;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};


export const createTask = async (taskData: Task): Promise<Task> => {
  try {
    // Log the payload being sent in the POST request
    console.log("POST Request to /tasks/ with payload:", taskData);

    const response = await axios.post(`${API_BASE_URL}/tasks/`, taskData, {
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
    console.log(`Attempting to update task with ID: ${taskId}`, taskData);
    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData, {
      headers: getAuthHeaders(),
    });
    console.log(`Successfully updated task with ID: ${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to update task with ID: ${taskId}`, error);
    throw error;
  }
};


export const deleteTask = async (taskId: number): Promise<{ message: string }> => {
  try {
    console.log(`Attempting to delete task with ID: ${taskId}`);
    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
      headers: getAuthHeaders(),
    });
    console.log(`Successfully deleted task with ID: ${taskId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to delete task with ID: ${taskId}`, error);
    throw error;
  }
};
