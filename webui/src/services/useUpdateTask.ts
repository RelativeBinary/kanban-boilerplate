import { useState, useEffect } from "react";
import { usePost, usePut } from "./apiClient";
import { Task } from "../types/task";

export const useUpdateTask = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const updateTask = async (taskData: Task) => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await usePost(`/task/${taskData.id}`, taskData);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateTask, loading, error };
};
