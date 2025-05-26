import { useEffect, useState } from "react"
import { getUsers } from "./fakeapi";
import type { User } from './types';

export const useGetUsers = () => {
  // todo add searchCriteria
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // todo add searchCriteria
      const response = await getUsers({});
      console.log('response', response);
      setUsers(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'unknown error occurred when getting users');
    } finally {
      setLoading(false);
    }
  };
  return {users, loading, error};
}