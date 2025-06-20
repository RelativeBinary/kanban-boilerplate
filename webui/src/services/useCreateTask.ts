import { useState } from "react";
import { usePost } from "./apiClient";
import { CreateTask } from "../types/task";
import { AxiosResponse } from "axios";

export const useCreateTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const createTask = async (newTask: CreateTask): Promise<AxiosResponse<any, any>> => {
    try {
      setLoading(true);
      setError(undefined);
      const response = await usePost(`/api/task`, newTask );
      return response.data.task;
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error occurred");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { createTask, loading, error };
}