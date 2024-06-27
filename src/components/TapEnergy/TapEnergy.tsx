import { FC, useEffect, useMemo } from 'react';
import { useGameData } from '@/hooks';
import './TapEnegry.css';

const TapEnergy: FC = () => {
  const { energy, setEnergy, maxEnergy } = useGameData();

  const progressStyles = useMemo(() => ({ width: `${(energy * 100) / maxEnergy}%` }), [energy]);

  useEffect(() => {
    const energyRecovery = setInterval(() => setEnergy((prev) => (prev < maxEnergy ? prev + 1 : prev)), 1000);

    return () => clearInterval(energyRecovery);
  }, []);

  return (
    <div className="energy-container">
      <span className="label">Energy:</span>

      <div className="energy-progress-bar">
        <div className="energy-progress" style={progressStyles} />

        <span className="energy-progress-status">
          {energy}/{maxEnergy}
        </span>
      </div>
    </div>
  );
};

export default TapEnergy;
