import { PostgreConstants } from '@server_db/db.constants'
import { createProvider } from '@server_utils/createProvider.utils'

const { CONNECT_DB: { connect, repository, users } } = PostgreConstants


export const UsersProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: users.name,
  },
])
