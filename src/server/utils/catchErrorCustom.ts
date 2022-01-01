import { of } from 'rxjs'
import { GraphQLError } from 'graphql'

export const catchErrorCustom = (err: string) => of(new GraphQLError(err))
// export const catchErrorCustom = (err) => of(new GraphQLError(err.message))
// export const catchErrorCustom = (err) => of(err)

