import { useEventCallback } from 'rxjs-hooks'
import { distinctUntilChanged, map, of, pipe, scan, switchMap, tap, withLatestFrom } from 'rxjs'
import { reducer } from '../utils/reducer'
import { LogColors, log } from '../utils/logColors'

/**
 * TODO типизировать
 */
type CreateService<S, A, R> = {
  initial: S
  handlersCreator: () => A
  reactions: R
  serviceName: string
}
export const useCreateService = <S, A, R>(props: CreateService<S, A, R>) => {
  const { initial, reactions, handlersCreator, serviceName } = props

  return useEventCallback<any, S>(
    (event$, state$) =>
      event$.pipe(
        withLatestFrom(state$),
        distinctUntilPropertyChanged(),
        switchMap(([action, state]) => of(action).pipe(
          applyReducer(reducer(handlersCreator), state, serviceName),
          // applyEffects(action),
          applyReactions(action, reactions)
        ))
      ),
    initial
  )
}

/**
 * Не пускает поток дальше если предыдущий и текущий Type и Payload равны
 */
export const distinctUntilPropertyChanged = () =>
  pipe(
    distinctUntilChanged(([prev], [next]) =>
      (prev.type === next.type) && (JSON.stringify(prev.payload) === JSON.stringify(next.payload))
    )
  )

/**
 * Меняет Стейт по Payload
 */
export const applyReducer = (reducer, initial, serviceName) => pipe(
  tap(({ type, payload }) => {
    console.group(`${serviceName} [type - ${type}]`)
    log(LogColors.fg.blue, ['payload', payload])
    log(LogColors.fg.magenta, ['prev state', initial])
  }),
  scan(reducer, initial),
  tap((result) => log(LogColors.fg.green, ['next state', result]))
)

/**
 * Вызывает методы
 */
export const applyEffects = ({ type, payload }) => pipe(
  switchMap((result: any) =>
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
    .then(response => response.json())
    .then(response => {
      log(LogColors.fg.yellow, ['effect', {
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

/**
 * Реакции на те или иные события связанные с изменение Стора
 */
export const applyReactions = ({ type, payload }, reactionsMap) =>
  pipe(
    map((result) =>
      [...reactionsMap].reduce((acc, [key, { description, fn }]) => {
        if (key.includes(type)) {
          log(LogColors.fg.cyan, ['apply reactions', {
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
      log(LogColors.fg.red, ['final', result])
      console.groupEnd()
    }))
