import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'

const { COSMO: { connect, repository, repository_EN, articles, articles_en } } = PostgreConstants

export const ArticlesProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: articles.name
  },
  {
    connect: [connect],
    repository: repository_EN,
    name: articles_en.name
  }
])
