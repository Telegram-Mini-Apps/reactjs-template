import { FC } from 'react';
import { useGameData } from '@/hooks';
import { TapArea, TapProgress, TapEnergy } from '@/components';
import styles from './HomePage.module.css';

const HomePage: FC = () => {
  const { earned, gameConfig, loadingGameConfig, errorGameConfig } = useGameData();

  if (loadingGameConfig) {
    return <h1>Loading...</h1>
  }

  if (errorGameConfig) {
    return <h1>{errorGameConfig.message}</h1>
  }

  if (!gameConfig) {
    return <h1>Something went wrong. Try again later.</h1>
  }

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
