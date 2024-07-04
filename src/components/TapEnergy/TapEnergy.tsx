import { FC, useMemo } from 'react';
import { useGameData } from '@/hooks';
import styles from './TapEnegry.module.css';

const TapEnergy: FC = () => {
  const { energy, maxEnergy } = useGameData();

  const progressStyles = useMemo(() => ({ width: `${(energy * 100) / maxEnergy}%` }), [energy]);

  return (
    <div className={styles.energyContainer}>
      <span className={styles.label}>Energy:</span>

      <div className={styles.energyProgressBar}>
        <div className={styles.energyProgress} style={progressStyles} />

        <span className={styles.energyProgressStatus}>
          {energy}/{maxEnergy}
        </span>
      </div>
    </div>
  );
};

export default TapEnergy;
