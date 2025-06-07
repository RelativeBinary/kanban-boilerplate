import { useEffect, useState } from "react";
import { useGet } from "./services/apiClient";
import "./App.css";
import { DashboardPage } from "./pages/DashboardPage";
import { UserPage } from "./pages/UserPage";
import { Paper } from "@mui/material";

function App() {
  // TODO user page stuff 
  function navigate(url: any) {
    window.location.href = url;
  }

  async function auth() {
    const response = await fetch("http://localhost:3000/request", {
      method: "post",
    });
    const data = await response.json();
    console.log("pre navigation", data);
    navigate(data.url);
  }

  return (
    <>
      {/* <button onClick={() => auth()}>google button</button> */}
      <DashboardPage />
      {/* <UserPage /> */}
    </>
  );
}

export default App;
