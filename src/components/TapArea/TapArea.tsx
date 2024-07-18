import React, { FC, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameData } from '@/hooks';
import styles from './TapArea.module.css';
import { useMutation } from '@apollo/client';
import { SEND_TAP_COUNT } from '@/components/TapArea/queries.ts';

interface Tap {
  id: number;
  x: number;
  y: number;
}

const TapArea: FC = () => {
  const [taps, setTaps] = useState<Tap[]>([]);
  const [tapCount, setTapCount] = useState(0);
  const {
    tapWeight,
    isTapAreaDisabled,
    onUserTap,
    gameConfig: { nonce },
    refetchGameConfig,
  } = useGameData();
  const intervalTapCountRef = useRef<number>(0);
  const [sendTapCount] = useMutation(SEND_TAP_COUNT);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (nonce && intervalTapCountRef.current) {
          await sendTapCount({
            variables: {
              payload: {
                tapsCount: intervalTapCountRef.current,
                nonce: nonce,
              },
            },
          });

          refetchGameConfig();
        }
        refetchGameConfig();
      } catch (error) {
        console.error(error);
      }

      intervalTapCountRef.current = 0;
    }, 5000);

    return () => clearInterval(interval);
  }, [nonce, refetchGameConfig, sendTapCount]);

  const handleTap = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isTapAreaDisabled) return;

    const boundingRect = e.currentTarget.getBoundingClientRect();
    const newTaps = Array.from(e.touches).map((touch, index) => ({
      id: tapCount + index,
      x: touch.clientX - boundingRect.left,
      y: touch.clientY - boundingRect.top,
    }));

    setTaps((prevTaps) => [...prevTaps, ...newTaps]);
    setTapCount((prevCount) => {
      const newCount = prevCount + e.touches.length;
      intervalTapCountRef.current += e.touches.length;
      return newCount;
    });
    onUserTap();

    navigator.vibrate(50);
  };

  const handleAnimationComplete = (id: number) => {
    setTaps((prevTaps) => prevTaps.filter((tap) => tap.id !== id));
  };

  return (
    <div className={styles.tapAreaContainer} onTouchStart={handleTap}>
      <img className={styles.tapArea} src={'../../../assets/eagle-coin.png'} alt={'Gold Eagle Coin Icon'} />

      <AnimatePresence>
        {taps.map((tap) => (
          <motion.div
            key={tap.id}
            className={styles.tapIndicator}
            initial={{ opacity: 1, scale: 1, y: 250 }}
            animate={{ opacity: 0, scale: 2, y: 150 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ top: tap.y, left: tap.x - 15 }}
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
