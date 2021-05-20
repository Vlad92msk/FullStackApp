import { InputType, Field } from '@nestjs/graphql'
import { IsString, IsNotEmpty } from 'class-validator'

@InputType()
export class CreateRoleInput {
  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  @IsString({ message: 'Значение должно быть строкой' })
  @Field()
  value: string

  @IsNotEmpty({ message: 'Значение не может быть пустым' })
  @IsString({ message: 'Значение должно быть строкой' })
  @Field()
  description: string
}
