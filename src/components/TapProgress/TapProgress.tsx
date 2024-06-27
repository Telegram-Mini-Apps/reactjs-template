import { FC, useEffect, useMemo, useState } from 'react';
import { useGameData } from '@/hooks';
import './TapProgress.css';

const TapProgress: FC = () => {
  const [progressLevel, setProgressLevel] = useState(1);
  const [levelLimit, setProgressLimit] = useState(10);
  const { count, setCount } = useGameData();

  const progressStyles = useMemo(() => ({ width: `${(count * 100) / levelLimit}%` }), [count, levelLimit]);

  useEffect(() => {
    if (count >= levelLimit) {
      setProgressLevel((prev) => prev + 1);
      setProgressLimit((prev) => Math.round(prev * 1.5));
      setCount(0)
    }
  }, [count]);

  return (
    <div className="container">
      <span className="progress-level">{progressLevel}</span>

      <div className="progress-bar">
        <div className="progress" style={progressStyles} />
        <span className="progress-status">
          {count}/{levelLimit}
        </span>
      </div>
    </div>
  );
};

export default TapProgress;
