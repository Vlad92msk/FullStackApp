import { InputType, Field } from '@nestjs/graphql'
import { IsEnum, IsString, IsNumber, IsNotEmpty } from 'class-validator'
import { Specialty } from '../interfaces/specialty'
import { enumMessage } from '~server/utils/enumeration'
import { IconName } from '~public/models/icon.model'

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
