import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  EMPTY, filter,
  isObservable, map,
  Observable, of, pairwise, pipe, scan,
  Subject, switchMap,
  tap
} from 'rxjs'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/**
 * TODO: Типизировать нормально
 */
export type Callback<P, R> = (s$: Observable<P>, state?: Observable<any>) => Observable<R>

export type UseObservableOptions<I = any, S = any, N = any> = {
  initial?: I
  subscribers$?: BehaviorSubject<S>[]
  inject?: N
}
type UseObservable = <P, R> (
  callback: Callback<P, R>,
  options?: UseObservableOptions
) => [R, (v: P) => void]
export const useObservable: UseObservable = (callback, { subscribers$, initial, inject }) => {
  const [state, state$] = useCreateState(initial)
  const [actions$, dispatch] = useCreateActionStore()
  const props$ = useCreateProps(inject)
  const newState$ = useCreateNewState(callback, actions$, props$)


  useEffect(() => {
    /**
     * Значения Колбэка - нашей функции которую мы передаем - передаются в локальное состояние
     * которые мы отдаем пользователю как обычное значение
     *
     * Или по другому
     * 1. Мы пайпим новое состояние
     * 2. Передаем его в поток сотсояния
     * 3. А уже оттуда получаем его как значение
     */
    const subscription = newState$
    .pipe(
      distinctUntilChanged()
    )
    .subscribe((v) => {
      state$.next(v)
      subscribers$?.forEach(s => s.next(v))
    })
    return () => subscription.unsubscribe()
  }, [newState$, state$, subscribers$])

  return [state, dispatch]
}


export const useCreateState = (initial?: any): [any, BehaviorSubject<any>] => {
  // state
  const [state, setState] = useState(initial)
  const stateRef = useRef<BehaviorSubject<any>>(null)
  if (!stateRef.current) {
    // @ts-ignore
    stateRef.current = new BehaviorSubject(state).pipe(
      tap((state: any) => {
        setState(state)
      }),
      catchError((err) => {
        throw err
      })
    )
  }
  const state$ = stateRef.current
  // подпишитесь на state$, но отмените подписку при размонтировании
  useEffect(() => {
    const sub = state$.subscribe()
    return () => sub.unsubscribe()
  }, [state$])

  return [state, state$]
}

export const useCreateActionStore = (): [Subject<any>, (...args: any[]) => void] => {
  const actionsRef = useRef<Subject<any>>(null)
  if (!actionsRef.current) {
    actionsRef.current = new Subject()
  }
  const actions$ = actionsRef.current
  const dispatch = useCallback(
    (...args) => {
      actions$.next(args.length > 1 ? args : args[0])
    },
    [actions$]
  )

  return [actions$, dispatch]
}

export const useCreateNewState = <P, R>(callback: Callback<P, R>, actions$, inject: Observable<any>): Observable<any> => {
  const epicRef = useRef<(s$: Observable<any>, props) => Observable<any>>(callback)
  // новое наблюдаемое состояние (поток - по сути Колбэк который мы передаем)
  return useMemo(() => {
    const newState$ = epicRef.current(
      actions$.asObservable(),
      // @ts-ignore
      inject
    )
    if (newState$ && !isObservable(newState$)) {
      if ('production' !== process.env.NODE_ENV) {
        // eslint-disable-next-line no-console
        console.warn(
          'use-epic: Epic returned something that was not an RXJS observable'
        )
      }
      return EMPTY
    }
    return newState$ || EMPTY
  }, [actions$, callback, inject])

}

export const useCreateProps = (props = {}) => {
  const props$ref = useRef<BehaviorSubject<any>>(null)
  if (!props$ref.current) {
    // @ts-ignore
    props$ref.current = new BehaviorSubject(props).pipe(
      // distinctUntilPropertyChanged()
    )
  }
  const props$ = props$ref.current
  props$.next(props)

  return useMemo(() => props$, [props$])
}
