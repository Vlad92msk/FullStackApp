import { PostgreConstants } from '~server/db/db.constants'
import { createProvider } from '~server/utils'


const { PORTFOLIO: { connect, repository, skills } } = PostgreConstants


export const SkillsProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: skills.name,
  },
])
