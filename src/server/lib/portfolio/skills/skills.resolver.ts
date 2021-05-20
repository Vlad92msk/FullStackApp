import { Resolver, Query } from '@nestjs/graphql'
import { SkillsService } from './skills.service'
import { Skills } from '~server/lib/portfolio/skills/entitys/skills.entity'

@Resolver(() => Skills)
export class SkillsResolver {
  constructor(private skillService: SkillsService) {}

  @Query(() => [Skills], { description: 'Найти умения' })
  async findAllSkills() {
    return await this.skillService.findAllSkills()
  }
}
