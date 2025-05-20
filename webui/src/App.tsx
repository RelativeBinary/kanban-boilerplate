import { useEffect, useState } from "react";
import { getAllTasks } from "./services/apiClient";
import { Button } from "@mui/material";


function App() {
  // why init ad empty array?
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('runnong onMount');
    fetchAllTasks();
  }, []);

  const fetchAllTasks = async () => {
    try {
      console.log('fetching all')
      // todo use request headers and make sure the env vile is not being used else where
      const response = await getAllTasks('/tasks');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
      <h2>Tasks</h2>
      { data && <div>{JSON.stringify(data)}</div>}
      <h2>MUI Test</h2>
      <Button variant="contained">Add task</Button>
    </>
  )
}

export default App
