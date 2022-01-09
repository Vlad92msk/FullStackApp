import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'

const { COSMO: { connect, repository, articles } } = PostgreConstants

export const ArticlesProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: articles.name
  }
])
