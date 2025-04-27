import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API || 'https://api.example.com';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define common API methods 
// url in this context is actually added ontop of the baseURL cofiguration
export const getAllTasks = (url:  string, config = {}) => {
  console.log('getting all tasks');
  return apiClient.get(url, config);
}