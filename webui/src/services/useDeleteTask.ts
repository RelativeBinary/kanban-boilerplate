import { useState, useEffect } from "react";
import { useDelete } from "./apiClient";

export const useDeleteTask = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  const deleteTask = async (taskId: number) => {
    try {
      const response = await useDelete(`/api/task/${taskId}`);
      return response.data.task;
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTask, loading, error };
};
