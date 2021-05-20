import { useEffect, useRef } from 'react';

/**
 * @property {number} duration - Длительность анимации
 * @property {Function} timing - Функция расчёта времени, получает текущее время
 * @property {Function} draw - Функция отрисовки, получает значение прогресса анимации
 */
export type AnimateParam = {
  duration?: number,
  timing?: (timeFraction: number) => number,
  endAnimation?: () => void;
  draw: (progress: number) => void | any,
}

/**
 * @property {AnimateParam} param
 */
export type AnimateFunction = (param: AnimateParam) => void

/**
 * @description Хук для анимации использующий requestAnimationFrame
 * @return {AnimateFunction} - Функция запускающая анимацию
 */
export const useAnimate = (): AnimateFunction => {
  const req = useRef(null);

  useEffect(() => () => cancelAnimationFrame(req.current), []);

  return ({
    duration = 500,
    timing = (timeFraction) => (timeFraction < 0 ? 0 : timeFraction),
    endAnimation,
    draw,
  }: AnimateParam) => {
    const start = performance.now();

    const animate = (time: number) => {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;

      const progress = timing(timeFraction);

      draw(progress);

      if (timeFraction < 1) {
        req.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(req.current);
        endAnimation?.();
      }
    };

    req.current = requestAnimationFrame(animate);
  };
};
