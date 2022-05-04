import { useEffect, useState } from 'react'
import { BehaviorSubject, scan, shareReplay, startWith } from 'rxjs'
import lodash from 'lodash'


/**
 * Создание наблюдаемого потока
 * @param initial
 */
export const createObservableStore = <T>(initial: T) => {
  const stream$ = new BehaviorSubject<T>(initial)
  stream$.pipe(
    startWith({ ...initial }),
    scan((state, payload) => ({ ...state, ...payload }), undefined),
    shareReplay(1)
  )
  return stream$
}

/**
 * Создание Стейта и подписка на обновления
 * @param stream$
 * @param initial
 */
export const useCreateObservableStore = <T>(stream$: BehaviorSubject<T>, initial?: any): T => {
  const [store, setStore] = useState<T>(initial)
  const [prev, setPrev] = useState<T>(initial)

  useEffect(() => {
    const a = stream$.subscribe(v => {
      /**
       * FIXME: мб это не надо
       */
      if (lodash.isEqual(prev, v)) return
      setStore(prev => ({ ...prev, ...v }))
      setPrev(v)
    })
    return () => a.unsubscribe()
  }, [initial, stream$, prev])

  return store
}
