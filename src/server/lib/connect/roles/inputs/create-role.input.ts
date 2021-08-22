import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsEnum } from 'class-validator'
import { RoleEnum } from '~server/lib/connect/roles/interfaces/role'

@InputType()
export class CreateRoleInput {
  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  @IsString({ message: 'Значение должно быть строкой' })
  @IsEnum(RoleEnum, { message: `Значение может быть: ${Object.values(RoleEnum).join(', ')}.` })
  @Field()
  value: RoleEnum

  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  @IsString({ message: 'Значение должно быть строкой' })
  @Field()
  description: string
}
