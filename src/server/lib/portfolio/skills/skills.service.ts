import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { catchError, from, map, of, switchMap } from 'rxjs'
import { GraphQLError } from 'graphql'

import { catchErrorCustom } from '@server_utils/catchErrorCustom'
import { MyObservable } from '@server/types'
import { PostgreConstants } from '@server_db/db.constants'
import { Skill } from './entitys/skills.entity'
import { CreateSkillInput } from './inputs/create-skill.input'
import { FindSkillInput } from './inputs/find-skill.input'

//
@Injectable()
export class SkillsService {
  constructor(
    @Inject(PostgreConstants.PORTFOLIO.repository)
    readonly skillRepository: Repository<Skill>
  ) {
  }

  public findAllSkills = (): MyObservable<Skill[]> => from(
    this.skillRepository.find()
  ).pipe(
    switchMap((data) => of(data)),
    catchError((err) => catchErrorCustom('findAllSkills - Ошибка при попытке найти все умение'))
  )


  /**
   * Найти 1 умение по условию
   */
  public findSkillByValue = (where: FindSkillInput): MyObservable<Skill> => from(
    this.skillRepository.findOne({ where })
  ).pipe(
    switchMap((data) => of(data)),
    catchError((err) => catchErrorCustom('findSkillByValue - Ошибка при попытке найти умение'))
  )


  /**
   * Создать умение
   */
  public createSkill = (input: CreateSkillInput): MyObservable<Skill> =>
    this.findSkillByValue(input)
    .pipe(
      switchMap((found) => {
        if (found) throw new GraphQLError('createSkill - Умение уже существует')

        return of(input).pipe(
          map((newSkill) => this.skillRepository.create(newSkill)),
          switchMap((createdSkill) => this.skillRepository.save(createdSkill)),
          catchError((err) => catchErrorCustom('createSkill - Ошибка создания умения')))
      }),
    )

}
