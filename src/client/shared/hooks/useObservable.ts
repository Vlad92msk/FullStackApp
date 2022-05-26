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
      distinctUntilPropertyChanged()
    )
  }
  const props$ = props$ref.current
  props$.next(props)

  return useMemo(() => props$, [props$])
}


export const distinctUntilPropertyChanged = () =>
  pipe(
    distinctUntilChanged(([prev], [next]) =>
      (prev.type === next.type) && (JSON.stringify(prev.payload) === JSON.stringify(next.payload))
    )
  )

const Log = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  underscore: '\x1b[4m',
  blink: '\x1b[5m',
  reverse: '\x1b[7m',
  hidden: '\x1b[8m',
  // Foreground (text) colors
  fg: {
    black: '\x1b[30m',
    red: '\x1b[1;31m',
    green: '\x1b[1;32m',
    yellow: '\x1b[1;33m',
    blue: '\x1b[1;34m',
    magenta: '\x1b[1;35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    crimson: '\x1b[38m'
  },
  // Background colors
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    crimson: '\x1b[48m'
  }
}
// https://simplernerd.com/js-console-colors/
const log = (color, text) => {
  console.log(`${color}%s${Log.reset}`, ...text)
}
export const applyReducer = (reducer, initial) => pipe(
  tap(({ type, payload }) => {
    console.group(`MessageService [type - ${type}]`)
    log(Log.fg.blue, ['payload', payload])
    log(Log.fg.magenta, ['prev state', initial])
  }),
  scan(reducer, initial),
  tap((result) => log(Log.fg.green, ['next state', result]))
)


export const applyEffects = ({ type, payload }) => pipe(
  switchMap((result: any) =>
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(response => response.json())
    .then(response => {
      log(Log.fg.yellow, ['effect', {
        description: 'Получаем покемонов',
        endpoint: 'https://pokeapi.co/api/v2/pokemon/ditto',
        response: response
      }])

      return ({
        ...result,
        pokemons: response
      })
    })
  )
)


export const applyReactions = ({ type, payload }, reactionsMap) =>
  pipe(
    map((result) =>
      [...reactionsMap].reduce((acc, [key, { description, fn }]) => {
        if (key.includes(type)) {
          log(Log.fg.cyan, ['apply reactions', {
            description,
            result: fn(acc)
          }])
          return fn(acc)
        } else {
          return acc
        }
      }, result)
    ),
    tap((result) => {
      log(Log.fg.red, ['final', result])
      console.groupEnd()
    }))
