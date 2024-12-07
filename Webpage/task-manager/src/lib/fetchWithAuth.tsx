export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authorization token is missing');
    }
  
    // Include the Authorization header
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`, // Add the token as a Bearer token
    };
  
    // Make the API request
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
  
    // Parse and return the response JSON
    return response.json();
  };
  