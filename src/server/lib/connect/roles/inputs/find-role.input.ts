import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNumber, IsEnum } from 'class-validator'
import { RoleEnum } from '~server/lib/connect/roles/interfaces/role'

@InputType()
export class FindRoleInput {
  @IsNumber()
  @Field({ nullable: true })
  id?: number

  @IsEnum(RoleEnum, { message: `Значение может быть: ${Object.values(RoleEnum).join(', ')}.` })
  @Field({ nullable: true })
  value?: RoleEnum

  @IsString({ message: 'Значение должно быть строкой' })
  @Field({ nullable: true })
  description?: string
}
