import "./App.css";
import { DashboardPage } from "./pages/DashboardPage";

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
    </>
  );
}

export default App;
