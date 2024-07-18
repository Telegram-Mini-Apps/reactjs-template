import { FC } from 'react';
import styles from './EnergyBar.module.css';
import { useGameData } from '@/hooks';

const EnergyBar: FC = () => {
  const { energy } = useGameData();

  const enegryAmount = Math.min(Math.ceil(energy / 100), 12);
  const componentsToRender = Array.from({ length: enegryAmount }, (_, index) => (
    <img key={index} src={'../../../assets/lightning.svg'} alt={'Lightning icon'} />
  ));

  return <div className={styles.energyBar}>{componentsToRender}</div>;
};

export default EnergyBar;
