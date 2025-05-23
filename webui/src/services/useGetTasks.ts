import { useState, useEffect } from "react";
import { useGet } from "./apiClient";

export const useGetAllTasks = () => {
  // 1. stateful stores
  const [tasks, setTasks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  // 2. on mount only execution, preventing infinite loop
  useEffect(() => {
    fetchTasks(); 
  }, []);

  // 3. actual api calling implementation
  const fetchTasks = async () => {
    try {
      const response = await useGet("/tasks");
      // Best practice to let axios throw the errors
      // if (response.status >= 400) {
      //   throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      // }

      setTasks(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { tasks, loading, error };
};

// Repetitions go here
const useGetAllTasks1 = () => {
  // 1. stateful storage 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  // 2. onmount execution to prevent infinite loop
  useEffect(() => {
    fetchTasks();
  })

  // 3. actual api calling implementation
  const fetchTasks = async () => {
    try {
      const response = await useGet('/tasks');
      // due to axios we dont need to do this 
      // if (response.status >= 400) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      setData(response.data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'unknown error occurred')
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error };
}
