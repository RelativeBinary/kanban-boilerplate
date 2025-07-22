import { NavLink, useNavigate } from "react-router";
import styles from "./NavBar.module.css";
import supabase from "../../supabaseClient";
import { Session } from "@supabase/supabase-js";

export const NavBar = ({ session }: { session: Session | null }) => {
  const navigate = useNavigate();

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/");
    }
  };

  return (
    <div className={styles["nav-container"]}>
      <NavLink to="/">
        <button>Dashboard</button>
      </NavLink>
      {session && (
        <>
          <NavLink to="/profile">
            <button>Profile</button>
          </NavLink>
          <NavLink to="/boards">
            <button>Boards</button>
          </NavLink>
        </>
      )}

      {session && (
        <div>
          {/* <span style={{ marginRight: "15px" }}>Hello, {userDisplayName}!</span> */}
          <button onClick={signOut}>Sign Out</button>
        </div>
      )}
      {!session && (
        <div>
          {/* <span style={{ marginRight: "15px" }}>Hello, {userDisplayName}!</span> */}
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};
