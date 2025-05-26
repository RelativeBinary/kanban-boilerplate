import { useState, useEffect } from "react";
import { useGet } from "./apiClient";

export const useGetTask = (taskId: number) => {
  // 1. stateful stores
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  // 2. onmount only execution, preventign infinite loop
  useEffect(() => {
    fetchTask();
  }, []);

  // 3. actual api calling implementation
  const fetchTask = async () => {
    try {
      const response = await useGet(`/task/${taskId}`);
      // Best practice to let axois throw the errors
      // if (response.status >= 400) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      setTask(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { task, loading, error };
};

// Repetitions go here