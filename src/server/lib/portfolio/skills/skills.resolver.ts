import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { from } from 'rxjs'
import { SkillsService } from './skills.service'
import { Skill } from '../skills/entitys/skills.entity'
import { CreateSkillInput } from '../skills/inputs/create-skill.input'
import { MyObservable } from '~server/types'

@Resolver(() => Skill)
export class SkillsResolver {
  constructor(private skillService: SkillsService) {
  }

  @Query(() => [Skill], { description: 'Найти умения' })
  findAllSkills(): MyObservable<Skill[]>  {
    return from(this.skillService.findAllSkills())
  }

  @Mutation(() => Skill, { description: 'Добавить умение' })
  skillsCreateSkill(
    @Args('newSkill') newSkill: CreateSkillInput
  ): MyObservable<Skill> {
    return from(this.skillService.createSkill(newSkill))
  }
}
