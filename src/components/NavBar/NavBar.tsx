import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import IconButton from '../IconButton';

const NavBar: FC = () => {
  const navigate = useNavigate();

  const onDebugPage = () => {
    navigate('/debug');
  };

  return (
    <div className={styles.navbar}>
      <IconButton icon={'rewards'} title={'Leaderboard'} />
      <IconButton icon={'boost'} title={'Boost'} />
      <IconButton icon={'mine'} title={'Mine'} />
      <IconButton icon={'fav'} title={'SL8'} />
      <IconButton icon={'fav'} title={'Debug'} onClick={onDebugPage} />
    </div>
  );
};

export default NavBar;
