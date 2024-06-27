import { FC } from 'react';
import './HomePage.css';
import { useGameData } from '@/hooks';
import { TapArea, TapProgress, TapEnergy } from '@/components';

const HomePage: FC = () => {
  const { count } = useGameData();

  return (
    <div className='container'>
      <h1 className="title">Earned: +{count}</h1>

      <TapProgress />
      <TapArea />
      <TapEnergy />
    </div>
  );
};

export default HomePage;
