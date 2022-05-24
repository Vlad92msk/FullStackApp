import { DefaultObject } from '@client/public/models/defaultObject.model'

export type Action = {
  type: string,
  payload: any
}
/**
 * TODO: как нибудь типизировать
 * @param handlers
 */
export const reducer = <H extends DefaultObject<any>>(handlers: H) => (state, { type, payload }: Action) => {
  const handler = handlers[type] || handlers.DEFAULT
  return handler(state, payload)
}
