import React, {createContext, useContext, useMemo, useState} from 'react';
import {useLocation} from '@docusaurus/router';

const ProgressContext = createContext(null);

const readCounter = (key) => {
  if (typeof window === 'undefined') return 0;
  const stored = window.localStorage.getItem(key);
  if (!stored) return 0;
  try {
    return Number(JSON.parse(stored)) || 0;
  } catch (err) {
    return 0;
  }
};

const ProgressProvider = ({children}) => {
  const {pathname} = useLocation();
  const counterKey = useMemo(() => `counter:${pathname}`, [pathname]);
  const [counter, setCounter] = useState(() => readCounter(counterKey));

  const persist = (next) => {
    setCounter(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(counterKey, JSON.stringify(next));
    }
  };

  const value = useMemo(
    () => ({
      counter,
      increment: () => persist(counter + 1),
      decrement: () => persist(Math.max(0, counter - 1)),
      resetCounter: () => persist(0),
      counterKey,
      pathname,
    }),
    [counter, counterKey, pathname],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
};

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
};

export default ProgressProvider;
