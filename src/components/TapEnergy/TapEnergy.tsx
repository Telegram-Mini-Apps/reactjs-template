import { FC, useEffect, useMemo } from 'react';
import { useGameData } from '@/hooks';
import styles from './TapEnegry.module.css';

const TapEnergy: FC = () => {
  const { energy, setEnergy, maxEnergy } = useGameData();

  const progressStyles = useMemo(() => ({ width: `${(energy * 100) / maxEnergy}%` }), [energy]);

  useEffect(() => {
    const energyRecovery = setInterval(() => setEnergy((prev) => (prev < maxEnergy ? prev + 1 : prev)), 1000);

    return () => clearInterval(energyRecovery);
  }, []);

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
