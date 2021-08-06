import { useState, useCallback } from 'react';

interface BooleanState {
  toggle: () => void;
  enable: () => void;
  disable: () => void;
}

export default function useBooleanState(initialValue = false): [boolean, BooleanState] {
  const [value, setValue] = useState(initialValue);

  return [
    value,
    {
      toggle: useCallback(() => setValue(prev => !prev), [setValue]),
      enable: useCallback(() => setValue(true), [setValue]),
      disable: useCallback(() => setValue(false), [setValue]),
    },
  ];
}
