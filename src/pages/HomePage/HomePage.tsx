import { FC } from 'react';
import { useGameData } from '@/hooks';
import { TapArea, TapProgress, TapEnergy } from '@/components';
import styles from './HomePage.module.css';

const HomePage: FC = () => {
  const { earned } = useGameData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Earned: +{earned}</h1>

      <TapProgress />
      <TapArea />
      <TapEnergy />
    </div>
  );
};

export default HomePage;
