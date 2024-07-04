import { FC, useMemo } from 'react';
import { useGameData } from '@/hooks';
import styles from './TapProgress.module.css';

const TapProgress: FC = () => {
  const { level, currentBossHealth, currentBossMaxHealth } = useGameData();

  const progressStyles = useMemo(
    () => ({ width: `${(currentBossHealth * 100) / currentBossMaxHealth}%` }),
    [currentBossMaxHealth],
  );

  return (
    <div className={styles.tapProgressContainer}>
      <span className={styles.tapProgressLevel}>{level}</span>

      <div className={styles.tapProgressBar}>
        <div className={styles.tapProgress} style={progressStyles} />
        <span className={styles.tapProgressStatus}>
          {currentBossHealth}/{currentBossMaxHealth}
        </span>
      </div>
    </div>
  );
};

export default TapProgress;
