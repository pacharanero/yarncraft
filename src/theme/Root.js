import React from 'react';
import ProgressProvider from '../components/ProgressProvider';
import CheckboxPersistence from '../components/CheckboxPersistence';

export default function Root({children}) {
  return (
    <ProgressProvider>
      <CheckboxPersistence />
      {children}
    </ProgressProvider>
  );
}
