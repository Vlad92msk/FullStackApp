import { config } from 'dotenv'
import { createDbProvider } from '@server_utils/createDbProvider'
import { PostgreConstants } from './db.constants'

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
