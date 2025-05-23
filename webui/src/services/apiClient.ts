import axios from 'axios';

const BASE_URL = import.meta.env.VITE_URL || 'ERROR_BAD_ENV_VARS';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define common API methods 
// url in this context is actually added ontop of the baseURL cofiguration
export const useGet = (url:  string, config = {}) => {
  return apiClient.get(url, config);
}