import { BehaviorSubject, Observable, scan, shareReplay, startWith } from 'rxjs'
import { useObservableState } from 'observable-hooks'


/**
 * Создание наблюдаемого потока
 * @param initial
 */
export const createObservableStore = <T>(initial: T):Observable<T> => {
  const stream$ = new BehaviorSubject<T>(initial)
  return stream$.pipe(
    startWith({ ...initial }),
    scan((state, payload) => ({ ...state, ...payload }), undefined),
    shareReplay(1)
  )
}

/**
 * Создание Стейта и подписка на обновления
 * @param stream$
 * @param initial
 */
export const useCreateObservableStore = <T>(stream$: Observable<T>, initial?: T): T => {
  return useObservableState(stream$, initial)
}
