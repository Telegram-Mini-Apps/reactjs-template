import React, { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameData } from '@/hooks';
import styles from './TapArea.module.css';

interface Tap {
  id: number;
  x: number;
  y: number;
}

const TapArea: FC = () => {
  const [taps, setTaps] = useState<Tap[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const { tapWeight, isTapAreaDisabled, onUserTap } = useGameData();

  const handleTap = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isTapAreaDisabled) return;

    const boundingRect = e.currentTarget.getBoundingClientRect();
    const newTaps = Array.from(e.touches).map((touch, index) => ({
      id: tapCount + index,
      x: touch.clientX - boundingRect.left,
      y: touch.clientY - boundingRect.top,
    }));

    setTaps((prevTaps) => [...prevTaps, ...newTaps]);
    setTapCount((prevCount) => prevCount + e.touches.length);
    onUserTap()

    navigator.vibrate(50);
  };

  const handleAnimationComplete = (id: number) => {
    setTaps((prevTaps) => prevTaps.filter((tap) => tap.id !== id));
  };

  return (
    <div className={styles.tapAreaContainer} onTouchStart={handleTap}>
      <div className={styles.tapArea}>
        <span className={styles.tapCount}>Tap</span>
      </div>

      <AnimatePresence>
        {taps.map((tap) => (
          <motion.div
            key={tap.id}
            className={styles.tapIndicator}
            initial={{opacity: 1, scale: 1, y: 300}}
            animate={{opacity: 0, scale: 2, y: 200}}
            exit={{opacity: 0}}
            transition={{duration: 0.6}}
            style={{top: tap.y, left: tap.x - 15}}
            onAnimationComplete={() => handleAnimationComplete(tap.id)}
          >
            +{tapWeight}
          </motion.div>
        ))}
      </AnimatePresence>

    </div>
  );
};

export default TapArea;
