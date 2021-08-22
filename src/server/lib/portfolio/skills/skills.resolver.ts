import { Resolver, Query } from '@nestjs/graphql'
import { SkillsService } from './skills.service'
import { Skill } from '~server/lib/portfolio/skills/entitys/skills.entity'

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(private skillService: SkillsService) {
  }

  @Query(() => [Skill], { description: 'Найти умения' })
  async findAllSkills() {
    return await this.skillService.findAllSkills()
  }
}
