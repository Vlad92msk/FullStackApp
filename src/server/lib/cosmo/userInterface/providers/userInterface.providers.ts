import { PostgreConstants } from '@server_db/db.constants'
import { createProvider } from '@server_utils/createProvider.utils'

const { COSMO: { connect, schemas: { INTERFACE: { ru, en } } } } = PostgreConstants

export const UserInterfaceProviders = createProvider([
  {
    connect: [connect],
    repository: ru.rep__interface_cosmo,
    name: ru.name__interface_cosmo
  },
  {
    connect: [connect],
    repository: en.rep__interface_cosmo,
    name: en.name__interface_cosmo
  }
])
