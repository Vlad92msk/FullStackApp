import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, IsString, IsNotEmpty, Matches } from 'class-validator'

@InputType()
export class CreateUsersInput {
  @IsNotEmpty({ message: 'Логин не должен быть пустым' })
  @IsString()
  @Field()
  name: string

  @IsNotEmpty()
  @Matches(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/, { message: 'Пароль ненадежный' })
  @Field()
  password: string

  @Field()
  @IsEmail()
  email: string
}
