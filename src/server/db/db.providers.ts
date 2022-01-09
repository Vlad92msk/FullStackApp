import { config } from 'dotenv'
import { PostgreConstants } from './db.constants'
import { createDbProvider } from '~server/utils/createDbProvider'

config()

const { CONNECT_DB, COSMO, PORTFOLIO } = PostgreConstants

export const databaseProviders = [
  createDbProvider({
    provide: CONNECT_DB.connect,
    dbName: process.env.POSTGRES_DB_NAME
  }),
  createDbProvider({
    provide: PORTFOLIO.connect,
    dbName: process.env.POSTGRES_DB_PORTFOLIO
  }),
  createDbProvider({
    provide: COSMO.connect,
    dbName: process.env.POSTGRES_DB_COSMO
  })
]
