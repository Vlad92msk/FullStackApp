import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNumber } from 'class-validator'

@InputType()
export class FindRoleInput {
  @IsNumber()
  @Field()
  id?: number

  @IsString({ message: 'Значение должно быть строкой' })
  @Field()
  value?: string

  @IsString({ message: 'Значение должно быть строкой' })
  @Field()
  description?: string
}
