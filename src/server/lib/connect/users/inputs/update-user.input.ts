import { InputType, Field } from '@nestjs/graphql'
import { StatusEnum } from '../interfaces/status'

@InputType()
export class UpdateUserInput {
  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  status?: StatusEnum

  @Field(() => [String], { nullable: true })
  uRoles?: string[]
}
