import { useState, useEffect } from "react";
import { useDelete } from "./apiClient";

export const useDeleteTask = (taskId: number) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    deleteTask();
  }, []);

  const deleteTask = async () => {
    try {
      const response = await useDelete(`/task/${taskId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error };
};
