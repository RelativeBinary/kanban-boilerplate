import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import type { Session } from "@supabase/supabase-js";
import "./App.css";
import { NavBar } from "./components/navBar/NavBar";
import { DashboardPage } from "./pages/DashboardPage";
import { ProfilePage } from "./pages/ProfilePage";
import { BoardsPage } from "./pages/BoardsPage";
import { use, useEffect, useState } from "react";
import supabase from "./supabaseClient";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [userDisplayName, setUserDisplayName] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  // On mount auth process
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.identities) {
        setUserDisplayName(session.user.identities[0].identity_data?.full_name);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.identities) {
        setUserDisplayName(session.user.identities[0].identity_data?.full_name);
      } else {
        setUserDisplayName(undefined);
      }
    });

    // Stop listening for auth stuff when app closes
    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      {/* <button onClick={() => auth()}>google button</button> */}
      <NavBar session={session} />
      {/* This could even be a generated list of components from a defined map for a more elegant 
      implementation */}
      <Routes>
        <Route
          path="/profile"
          element={
            <ProtectedRoute session={session}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boards"
          element={
            <ProtectedRoute session={session}>
              <BoardsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={session ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="/" element={<DashboardPage />} />
        <Route
          path="*"
          element={
            session ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
