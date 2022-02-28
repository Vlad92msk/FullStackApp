import { Connection, createConnection } from 'typeorm'
import { config } from 'dotenv'
config()


type createDbProviderType = {
  provide: string
  dbName: string
}

type Provider = {
  provide: string
  useFactory: () => Promise<Connection>
}

export const createDbProvider = ({ provide, dbName }: createDbProviderType): Provider => ({
  provide,
  useFactory: async () =>
    await createConnection({
      host: process.env.POSTGRES_DB_HOST,
      port: +process.env.POSTGRES_DB_PORT,
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      synchronize: process.env.APP_HOST === 'localhost',
      type: 'postgres',
      name: dbName,
      database: dbName,
      entities: [__dirname + `/../lib/${dbName}/**/entitys/*.entity{.ts,.js}`],
    }),
})
