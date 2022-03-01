import { PostgreConstants } from '@server_db/db.constants'
import { createProvider } from '@server_utils/createProvider.utils'


const { PORTFOLIO: { connect, repository, skills } } = PostgreConstants


export const SkillsProviders = createProvider([
  {
    connect: [connect],
    repository: repository,
    name: skills.name,
  },
])
