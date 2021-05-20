import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'

export const TokenProviders = createProvider([
  {
    connect: [PostgreConstants.connect_db.connect],
    repository: PostgreConstants.connect_db.repository,
    name: PostgreConstants.connect_db.tokens.name,
  },
])
