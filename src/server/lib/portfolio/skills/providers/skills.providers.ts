import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'

export const SkillsProviders = createProvider([
  {
    connect: [PostgreConstants.portfolio.connect],
    repository: PostgreConstants.portfolio.repository,
    name: PostgreConstants.portfolio.skills.name,
  },
])
