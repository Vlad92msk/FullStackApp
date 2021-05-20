import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'
import { Users } from '~server/lib/connect/users/entitys/user.entity'

export const UsersProviders = createProvider([
  {
    connect: [PostgreConstants.connect_db.connect],
    repository: PostgreConstants.connect_db.repository,
    name: PostgreConstants.connect_db.users.name,
  },
])

// export const UsersProviders = [
//   {
//     provide: PostgreConstants.connect_db.repository,
//     useValue: Users,
//   },
// ]
