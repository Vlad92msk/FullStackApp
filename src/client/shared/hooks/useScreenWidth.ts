import { useEffect, useState } from 'react'
import { map, fromEvent, debounceTime, distinct } from 'rxjs'


const screenWidth$ = (typeof window !== 'undefined') && fromEvent(window, 'resize').pipe(
  debounceTime(400),
  map(() => window.innerWidth),
  distinct(),
)

export const useScreenWidth = (): number => {
  if (typeof window === 'undefined') return 0
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const watchScreenWidth$ = screenWidth$.subscribe(setScreenWidth)
    return () => watchScreenWidth$.unsubscribe()
  }, [])

  return screenWidth
}
