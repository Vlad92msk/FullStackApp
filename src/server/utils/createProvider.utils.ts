import { Connection } from 'typeorm'

type ProvidersType = {
  repository: string
  name: string
  connect: string[]
}

export const createProvider = (params: ProvidersType[]) =>
  params.map(({ repository, name, connect }) => ({
    inject: connect,
    provide: repository,
    useFactory: (connection: Connection) => connection.getRepository(name),
  }))
