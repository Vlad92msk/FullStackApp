import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'

const { COSMO: { connect, schemas: { ARTICLES: { ru, en } } } } = PostgreConstants

export const ArticlesProviders = createProvider([
  {
    connect: [connect],
    repository: ru.rep__base_articles,
    name: ru.name__base_articles
  },
  {
    connect: [connect],
    repository: en.rep__base_articles,
    name: en.name__base_articles
  }
])
