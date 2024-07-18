import { FC } from 'react';
import styles from './RewardBanner.module.css';
import { useGameData } from '@/hooks';

const RewardBanner: FC = () => {
  const { earned } = useGameData();

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <img className={styles.goldIcon} src={'../../../assets/gold.png'} alt={'Gold icon'} />
        <span className={styles.amount}>{earned}</span>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.column}>
        <p className={styles.label}>Prize pool: 10m SSLX (currently $55,000)</p>
        <p className={styles.label}>Target SSLX price: $200</p>
      </div>
    </div>
  );
};

export default RewardBanner;
