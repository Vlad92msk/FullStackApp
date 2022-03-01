import { InputType, Field } from '@nestjs/graphql'
import { IsEnum, IsString, IsNumber, IsNotEmpty } from 'class-validator'

import { enumMessage } from '@server_utils/enumeration'
import { IconName } from '@client_public/models/icon.model'
import { Specialty } from '../interfaces/specialty'


@InputType({
  description: 'Добавить навык'
})
export class CreateSkillInput {
  @Field({ description: 'Название умения' })
  @IsNotEmpty({ message: 'Название не может быть пустым' })
  @IsString()
  name: IconName

  @Field({ description: 'Позиция в сетке' })
  @IsNotEmpty({ message: 'Позиция не может быть пустой' })
  @IsNumber()
  position: number

  @Field({ description: 'Специальность' })
  @IsNotEmpty({ message: 'Специальность не может быть пустой' })
  @IsEnum(Specialty, { message: enumMessage(Specialty) })
  specialty: Specialty
}
