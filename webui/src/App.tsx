import { useEffect, useState } from "react";
import { useGet } from "./services/apiClient";
// import { Button } from "@mui/material";
import { DashboardPage } from "./pages/DashboardPage";


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
      const response = await useGet('/tasks');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
      <DashboardPage/>
    </>
  )
}

export default App
