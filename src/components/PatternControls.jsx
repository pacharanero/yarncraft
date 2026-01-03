import React from 'react';
import styles from './PatternControls.module.css';
import {useProgress} from './ProgressProvider';

const PatternControls = () => {
  const {counter, increment, decrement, resetCounter} = useProgress();

  const handleResetAll = () => {
    resetCounter();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('pattern-reset'));
    }
  };

  return (
    <div className={styles.panel}>
      <div>
        <span className={styles.label}>Stitch counter</span>
        <div className={styles.counter}>
          <button type="button" onClick={decrement} aria-label="Decrease stitch count">
            −
          </button>
          <output aria-live="polite" aria-label="Current stitch count">{counter}</output>
          <button type="button" onClick={increment} aria-label="Increase stitch count">
            +
          </button>
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
