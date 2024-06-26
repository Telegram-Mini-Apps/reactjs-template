import { FC } from 'react';
import './NavBar.css';
import { Link } from "react-router-dom";

const NavBar: FC = () => {
  return (
    <div className="navbar">
      <Link to="/home" className="nav-button">
        <span>Home</span>
      </Link>
      <Link to="/invite" className="nav-button">
        <span>Invite</span>
      </Link>
      <Link to="/leaderboard" className="nav-button">
        <span>Leaderboard</span>
      </Link>
      <Link to="/boosters" className="nav-button">
        <span>Boosters</span>
      </Link>
    </div>
  );
};

export default NavBar;
