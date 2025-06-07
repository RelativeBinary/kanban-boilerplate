import axios from 'axios';

const BASE_URL = import.meta.env.VITE_URL || 'ERROR_BAD_ENV_VARS';
console.log('vite url', import.meta.env.VITE_URL);

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

export const usePost = <T = unknown>(url: string, data: T, config = {}) => {
  return apiClient.post(url, data, config);
}

// used for replacing a whole resource
// if its not in the payload that means we want it gone
export const usePut = <T = unknown>(url: string, data: T, config = {}) => {
  return apiClient.put(url, data, config);
}

// used for replacing part of a resource and not the whole thing
// only updating what we are providing
export const usePatch = <T = any>(url: string, data: T, config = {}) => {
  return apiClient.patch(url, data, config);
}

export const useDelete = (url: string, config = {}) => {
  // if you wish to send delete target as an obj instead of in the url 
  // you can put it in the config obj as 'data: { ur data }'
  return apiClient.delete(url, config);
}

// Repetitions here 
const apiClient1 = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const useGet1 = (url: string, config = {}) => {
  return apiClient.get(url, config);
};