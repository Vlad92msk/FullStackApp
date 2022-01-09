import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'

const { CONNECT_DB: { connect, repository, tokens } } = PostgreConstants

export const TokenProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: tokens.name,
  },
])
