import { DefaultObject } from '@client/public/models/defaultObject.model'

export type Action = {
  type: string,
  payload: any
}
/**
 * TODO: как нибудь типизировать
 * @param handlersCreator
 */
export const reducer = <H extends () => DefaultObject<any>>(handlersCreator: H) => (state, { type, payload }: Action) => {
  const handler = handlersCreator()[type] || handlersCreator().DEFAULT
  return handler(state, payload)
}
