import React, {useEffect, useMemo, useState} from 'react';
import styles from './PatternControls.module.css';
import {useProgress} from './ProgressProvider';

const PatternControls = () => {
  const {counter, increment, decrement, resetCounter} = useProgress();
  const [lastCounterUpdate, setLastCounterUpdate] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    if (!lastCounterUpdate) {
      setElapsedSeconds(0);
      return undefined;
    }

    const updateElapsed = () => {
      const nextElapsed = Math.floor((Date.now() - lastCounterUpdate) / 1000);
      setElapsedSeconds(nextElapsed);
    };

    updateElapsed();
    const intervalId = window.setInterval(updateElapsed, 1000);

    return () => window.clearInterval(intervalId);
  }, [lastCounterUpdate]);

  const formattedElapsed = useMemo(() => {
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, [elapsedSeconds]);

  const handleIncrement = () => {
    setLastCounterUpdate(Date.now());
    increment();
  };

  const handleDecrement = () => {
    setLastCounterUpdate(Date.now());
    decrement();
  };

  const handleResetAll = () => {
    resetCounter();
    setLastCounterUpdate(null);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('pattern-reset'));
    }
  };

  return (
    <div className={styles.panel}>
      <div>
        <span className={styles.label}>Stitch counter</span>
        <div className={styles.counter}>
          <button type="button" onClick={handleDecrement} aria-label="Decrease stitch count">
            −
          </button>
          <output aria-live="polite" aria-label="Current stitch count">{counter}</output>
          <button type="button" onClick={handleIncrement} aria-label="Increase stitch count">
            +
          </button>
        </div>
        <div className={styles.timer}>
          <span className={styles.timerLabel}>Time since last update</span>
          <output aria-live="polite" aria-label="Elapsed time since last stitch update">
            {formattedElapsed}
          </output>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.reset} onClick={handleResetAll}>
          Reset checkboxes & counter
        </button>
      </div>
    </div>
  );
};

export default PatternControls;
