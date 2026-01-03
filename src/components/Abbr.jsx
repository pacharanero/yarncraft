import React, {useMemo, useState} from 'react';
import abbreviations from '../data/abbreviations.json';
import styles from './Abbr.module.css';

const Abbr = ({code}) => {
  const [open, setOpen] = useState(false);
  const entry = useMemo(() => abbreviations[code] ?? null, [code]);
  if (!entry) {
    return <span className={styles.unknown}>{code}</span>;
  }

  return (
    <button
      type="button"
      className={styles.abbr}
      onClick={() => setOpen((val) => !val)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={() => setOpen(false)}
      aria-haspopup="dialog"
      aria-expanded={open}
      aria-label={`${code}: ${entry}`}
    >
      <span className={styles.code}>{code}</span>
      <span className={styles.tooltip} data-open={open} role="status">
        <strong>{code}</strong>
        <span className={styles.definition}>{entry}</span>
      </span>
    </button>
  );
};

export default Abbr;
