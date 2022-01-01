import { Observable } from 'rxjs'
import { GraphQLError } from 'graphql'

export type MyObservable<T> = Observable<T | GraphQLError>
