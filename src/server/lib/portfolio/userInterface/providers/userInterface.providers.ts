import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'

const {
  PORTFOLIO: {
    connect,
    tables: { INTERFACE: { ru, en } }
  }
} = PostgreConstants

export const UserInterfaceProviders = createProvider([
  {
    connect: [connect],
    repository: ru.repository,
    name: ru.data_base
  },
  {
    connect: [connect],
    repository: en.repository,
    name: en.data_base
  }
])
