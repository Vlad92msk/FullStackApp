import React, { useCallback, useEffect, useRef, useState } from 'react'
import { debounceTime, Subject, distinct } from 'rxjs'

const inputSubject$ = new Subject()
const onInput$ = inputSubject$.pipe(
  distinct(),
  debounceTime(2000),
)

/**
 * TODO: ХЗ, странно работает. Потом разобраться
 * @param initial
 */
export const useDebounce = (initial: string): [string, (c: any) => void] => {
  const [inputText, setInputText] = useState(initial)

  useEffect(() => {
    const watchScreenWidth$ = onInput$.subscribe(setInputText)
    return () => watchScreenWidth$.unsubscribe()
  }, [])

  const d = useCallback((c) => inputSubject$.next(c), [])
  return [inputText, d]
}


