import React, {useEffect} from 'react';
import {useLocation} from '@docusaurus/router';

const storageKeyFor = (pathname) => `checkboxes:${pathname}`;

const readState = (key) => {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(window.localStorage.getItem(key) || '{}');
  } catch {
    return {};
  }
};

const writeState = (key, value) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
};

const hydrate = (checkboxes, state) => {
  checkboxes.forEach((input, index) => {
    // GitHub-flavored markdown renders task list checkboxes as disabled by default.
    // Enable them so taps work on touch devices.
    // eslint-disable-next-line no-param-reassign
    input.disabled = false;
    input.removeAttribute('disabled');
    input.removeAttribute('aria-disabled');
    // Some mobile browsers keep disabled inputs non-interactive without pointer events reset.
    // eslint-disable-next-line no-param-reassign
    input.style.pointerEvents = 'auto';

    const checked = state?.[index];
    if (typeof checked === 'boolean') {
      // eslint-disable-next-line no-param-reassign
      input.checked = checked;
    }
  });
};

const CheckboxPersistence = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    const key = storageKeyFor(pathname);
    const checkboxes = Array.from(document.querySelectorAll('main input[type="checkbox"]'));
    const state = readState(key);
    hydrate(checkboxes, state);

    const handleChange = (event) => {
      const index = checkboxes.indexOf(event.target);
      if (index === -1) return;
      const next = {...readState(key), [index]: event.target.checked};
      writeState(key, next);
    };

    const handleReset = () => {
      writeState(key, {});
      checkboxes.forEach((input) => {
        // eslint-disable-next-line no-param-reassign
        input.checked = false;
      });
    };

    checkboxes.forEach((input) => input.addEventListener('change', handleChange));
    window.addEventListener('pattern-reset', handleReset);

    return () => {
      checkboxes.forEach((input) => input.removeEventListener('change', handleChange));
      window.removeEventListener('pattern-reset', handleReset);
    };
  }, [pathname]);

  return null;
};

export default CheckboxPersistence;
