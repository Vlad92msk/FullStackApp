import { config } from 'dotenv'
import { PostgreConstants } from './db.constants'
import { createDbProvider } from '~server/utils/createDbProvider'

config()

const { CONNECT_DB, COSMO, PORTFOLIO } = PostgreConstants

export const databaseProviders = [
  createDbProvider({
    provide: CONNECT_DB.connect,
    dbName: 'connect',
  }),
  createDbProvider({
    provide: PORTFOLIO.connect,
    dbName: 'portfolio',
  }),
  createDbProvider({
    provide: COSMO.connect,
    dbName: 'cosmo',
  })
]
