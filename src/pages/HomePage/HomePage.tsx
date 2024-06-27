import { FC } from 'react';
import './HomePage.css';
import { useGameData } from '@/hooks';
import { TapArea, TapProgress } from '@/components';

const HomePage: FC = () => {
  const { count } = useGameData();

  return (
    <div>
      <h1 className="title">Earned: +{count}</h1>

      <TapProgress />
      <TapArea />
    </div>
  );
};

export default HomePage;
