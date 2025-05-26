import { useState, useEffect } from "react";
import { usePost, usePut } from "./apiClient";
import { Task } from "../types/task";

export const useUpdateTask = (taskData: Task) => {
  const [updatedTask, setUpdatedTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    updateTask();
  }, []);

  const updateTask = async () => {
    try {
      const response = await usePost(`/task/${taskData.id}`, taskData);
      setUpdatedTask(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'unknown error occurred');  
    } finally {
      setLoading(false);
    }
  };

  return {updatedTask, loading, error};
};