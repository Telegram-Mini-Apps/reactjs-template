import { FC } from 'react';
import { useGameData } from '@/hooks';
import { RewardBanner, TapArea, EnergyBar } from '@/components';
import styles from './HomePage.module.css';

const HomePage: FC = () => {
  const { gameConfig, loadingGameConfig, errorGameConfig } = useGameData();

  if (loadingGameConfig) {
    return <h1>Loading...</h1>;
  }

  if (errorGameConfig) {
    return <h1>{errorGameConfig.message}</h1>;
  }

  if (!gameConfig) {
    return <h1>Something went wrong. Try again later.</h1>;
  }

  return (
    <div className={styles.container}>
      <RewardBanner />
      <EnergyBar />
      <TapArea />
    </div>
  );
};

export default HomePage;
