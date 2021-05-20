import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Connection, ConnectionOptions, createConnection, EntitySchema } from 'typeorm'
import { config } from 'dotenv'
config()


const defaultOptions: TypeOrmModuleOptions  = {
  host: process.env.POSTGRES_DB_HOST,
  port: +process.env.POSTGRES_DB_PORT,
  username: process.env.POSTGRES_DB_USERNAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  synchronize: true,
  autoLoadEntities: true,
}

type createDbProviderType = {
  provide: string
  dbName: string
  entities?: (string | Function | EntitySchema<any>)[]
}

type Provider = {
  provide: string
  useFactory: () => Promise<Connection>
}

export const createDbProvider = ({ provide, dbName, entities}: createDbProviderType): Provider => ({
  provide,
  useFactory: async () =>
    await createConnection({
      ...defaultOptions,
      type: 'postgres',
      name: dbName,
      database: dbName,
      entities: [`dist/server/lib/${dbName}/**/entitys/*.entity{.ts,.js}`],
      // entities,
    }),
})
