import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  let navigate = useHistory();

  const handleLogOut = (e) => {
    e.preventDefault();

    localStorage.removeItem("user");
    navigate.push("/auth");
  }

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/auth'>Login</Link>
          </li>
            <li>
              <Link to='/apartments'>Explore</Link>
            </li>
            <li>
              <button onClick={handleLogOut}>Logout</button>
            </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
