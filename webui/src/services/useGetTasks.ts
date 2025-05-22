import { useState, useEffect } from 'react';

export const useGetAllTasks = () => {
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    useEffect(() => {
        const fetchTasks = async () => {
            try { 
                const response = await fetch('/tasks');

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                setTasks(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Something went wrong');
            } finally { 
                setLoading(false);
            }
        }
        fetchTasks();
    }, [])

    return {tasks, loading, error};
}