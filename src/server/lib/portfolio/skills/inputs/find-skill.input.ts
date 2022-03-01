import { InputType, Field } from '@nestjs/graphql'
import { IsEnum, IsString } from 'class-validator'

import { enumMessage } from '@server_utils/enumeration'
import { IconName } from '@client_public/models/icon.model'
import { Specialty } from '../interfaces/specialty'


@InputType({ description: 'Найти навык' })
export class FindSkillInput {
  @Field({ name: 'Название умения' })
  @IsString()
  name?: IconName

  @Field({ name: 'Специальность' })
  @IsEnum(Specialty, { message: enumMessage(Specialty) })
  specialty?: Specialty
}
