import { useCallback, useEffect, useState } from 'react';

export const useScreenWidth = (): number => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleResizeWindows = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindows);

    return () => window.removeEventListener('resize', handleResizeWindows);
  }, [handleResizeWindows]);

  return screenWidth;
};
