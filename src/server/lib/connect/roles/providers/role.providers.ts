import { PostgreConstants } from '@server_db/db.constants'
import { createProvider } from '@server_utils/createProvider.utils'

const { CONNECT_DB: { connect, repository, roles } } = PostgreConstants


export const RolesProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: roles.name,
  },
])
