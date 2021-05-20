import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class ConfirmAccountInput {
  @IsNotEmpty() // Не должен быть пустым
  @Field()
  token: string
}
