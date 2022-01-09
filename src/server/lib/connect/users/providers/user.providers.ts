import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'

const { CONNECT_DB: { connect, repository, users } } = PostgreConstants


export const UsersProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: users.name,
  },
])
