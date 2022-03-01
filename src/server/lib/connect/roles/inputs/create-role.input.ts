import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty, IsEnum } from 'class-validator'
import { enumMessage } from '@server_utils/enumeration'
import { RoleEnum } from '../interfaces/role'

@InputType()
export class CreateRoleInput {
  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  @IsString({ message: 'Значение должно быть строкой' })
  @IsEnum(RoleEnum, { message: enumMessage(RoleEnum) })
  @Field()
  value: RoleEnum

  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  @IsString({ message: 'Значение должно быть строкой' })
  @Field()
  description: string
}
