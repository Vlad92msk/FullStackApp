import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNumber, IsEnum } from 'class-validator'
import { RoleEnum } from '~server/lib/connect/roles/interfaces/role'
import { enumMessage } from '~server/utils/enumeration'

@InputType()
export class FindRoleInput {
  @IsNumber()
  @Field({ nullable: true })
  id?: number

  @IsEnum(RoleEnum, { message: enumMessage(RoleEnum) })
  @Field({ nullable: true })
  value?: RoleEnum

  @IsString({ message: 'Значение должно быть строкой' })
  @Field({ nullable: true })
  description?: string
}
