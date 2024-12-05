import axios from 'axios';

const API_BASE_URL = 'http://10.0.0.52:8000';  

export interface User {
  userId?: number;
  username: string;
  password: string;
  roleId?: number;
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw error;
  }
};

export const getUser = async (userId: number): Promise<User> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};

export const createUser = async (userData: User): Promise<User> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/`, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};

export const loginUser = async (credentials: { username: string; password: string }): Promise<{ access_token: string; token_type: string }> => {
  try {
    const formData = new URLSearchParams();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);

    const response = await axios.post(`${API_BASE_URL}/login/`, formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to login:', error);
    throw error;
  }
};

export const updateUser = async (userId: number, userData: Partial<User>): Promise<User> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error('Failed to update user:', error);
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<{ message: string }> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete user:', error);
    throw error;
  }
};
