import { Route, Router, Routes } from "react-router";
import "./App.css";
import { NavBar } from "./components/navBar/NavBar";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { BoardsPage } from "./pages/BoardsPage";

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
      <NavBar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/boards" element={<BoardsPage />} />
      </Routes> 
    </>
  );
}

export default App;
