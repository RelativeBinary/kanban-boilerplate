import { useState, useEffect } from "react";
import { useDelete } from "./apiClient";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const deleteTask = async (taskId: number) => {
    try {
      const response = await useDelete(`/task/${taskId}`);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading, error };
};
