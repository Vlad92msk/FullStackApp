import { config } from 'dotenv'
import { PostgreConstants } from './db.constants'
import { createDbProvider } from '~server/utils/createDbProvider'
import { Roles } from '~server/lib/connect/roles/entitys/role.entity'
import { Users } from '~server/lib/connect/users/entitys/user.entity'
import { Tokens } from '~server/lib/connect/tokens/entitys/token.entity'
import { Skills } from '~server/lib/portfolio/skills/entitys/skills.entity'
config()

export const databaseProviders = [
  createDbProvider({
    provide: PostgreConstants.connect_db.connect,
    dbName: process.env.POSTGRES_DB_NAME,
    // entities: [Roles, Users, Tokens],
  }),
  createDbProvider({
    provide: PostgreConstants.portfolio.connect,
    dbName: process.env.POSTGRES_DB_PORTFOLIO,
    // entities: [Skills],
  }),
]
