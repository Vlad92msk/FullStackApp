import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsEmail } from 'class-validator'

@InputType()
export class SignInInput {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string

  @IsNotEmpty()
  @Field()
  password: string
}
