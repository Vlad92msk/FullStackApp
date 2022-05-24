import { distinctUntilChanged, map, Observable, of, scan, share, switchMap, tap } from 'rxjs'
import React, { useEffect } from 'react'
import { distinctUntilPropertyChanged, UseObservableOptions } from '@client_shared/hooks/useObservable'

export const useCreateService = <S>(
  store$: Observable<S>,
  store: S,
  setStore: React.Dispatch<React.SetStateAction<S>>
) => {
  useEffect(() => {
    const result = store$.pipe(
      distinctUntilChanged(),
      distinctUntilPropertyChanged(),
      /**
       * Обновляем данные в сторе
       */
      tap((v: S) => setStore(prev => ({ ...prev, ...v }))),
      /**
       * Возвращаем те данные, что вернул эффект
       * для того, чтобы в кортеже возвращать [результат, сетРезультат]
       * а не весь Стор
       */
      switchMap((payload) => of(payload).pipe(
        scan((acc, item) => ({ ...acc, ...item }), store)
      )),
      /**
       * Хз - надо это или нет
       */
      share()
    ).subscribe(v => v)

    return () => result.unsubscribe()
  }, [store$])
}

export type ServicePick<S, T extends keyof S> = Pick<S, T>

/**
 * S - Стор
 * P - Payload
 * R - Response
 */
export type ServiceAction<S, P, R extends keyof S> = (payload: Observable<P>, options?: UseObservableOptions) => Observable<ServicePick<S, R>>

/**
 * Получение типов из аргументов функции
 */
type ArgumentTypes<F extends Function> = F extends ({ ...args }: infer A) => any ? A : never;
