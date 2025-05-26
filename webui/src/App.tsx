import { useEffect, useState } from "react";
import { useGet } from "./services/apiClient";
import "./App.css";
import { DashboardPage } from "./pages/DashboardPage";
import { UserPage } from "./pages/UserPage";

function App() {
  return (
    <>
      <DashboardPage />
      <UserPage />
    </>
  );
}

export default App;
