import { FC } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';

const NavBar: FC = () => {
  return (
    <div className={styles.navbar}>
      <Link to="/home" className={styles.navButton}>
        <span>Home</span>
      </Link>
      <Link to="/invite" className={styles.navButton}>
        <span>Invite</span>
      </Link>
      <Link to="/leaderboard" className={styles.navButton}>
        <span>Leaderboard</span>
      </Link>
      <Link to="/boosters" className={styles.navButton}>
        <span>Boosters</span>
      </Link>
    </div>
  );
};

export default NavBar;
