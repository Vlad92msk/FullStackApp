import { Observable } from 'rxjs'
import { GraphQLError } from 'graphql'

export type MyObservable<T> = Observable<T | GraphQLError>

export enum VALIDATE_MESSAGE {
  IS_STRING = 'Значение должно быть строкой',
  IS_NUMBER = 'Значение должно быть числом'
}
