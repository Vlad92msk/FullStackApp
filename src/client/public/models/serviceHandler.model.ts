import { DefaultObject } from './defaultObject.model'

/**
 * K - ключи Экшенов
 * S - Стейт
 * A - Объект Экшенов
 */
export type CreateHandlers<K extends string, S, A extends DefaultObject<(a) => any>> = {
  [D in K]: (state: S, payload: ReturnType<A[D]>['payload']) => void
}
