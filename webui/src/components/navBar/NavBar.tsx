import { NavLink } from 'react-router';
import styles from './NavBar.module.css';

export const NavBar = () => {
  return (
    <div className={styles['nav-container']}>
      <NavLink to="/profile"><button>Profile</button></NavLink>
      <NavLink to="/boards"><button>Boards</button></NavLink>
      <NavLink to="/"><button>Dashboard</button></NavLink>
    </div>
  )
}