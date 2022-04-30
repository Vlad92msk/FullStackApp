import { MouseEventHandler, useCallback, useState } from 'react';

export const useAnchorElState = <T extends HTMLElement>(
  initialValue: T | null,
): [T | null, MouseEventHandler<T>, () => void] => {
  const [value, setValue] = useState<T>(initialValue);

  const setAnchorEl: MouseEventHandler<T> = useCallback(({ currentTarget }) => setValue(currentTarget), []);
  const clearValue = useCallback(() => setValue(null), []);

  return [value, setAnchorEl, clearValue];
};
