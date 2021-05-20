import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Skills } from './entitys/skills.entity'
import { PostgreConstants } from '~server/db/db.constants'

@Injectable()
export class SkillsService {
  constructor(
    @Inject(PostgreConstants.portfolio.repository)
    readonly skillRepository: Repository<Skills>
  ) {}

  public findAllSkills = async () => {
    return await this.skillRepository.find()
  }
}
