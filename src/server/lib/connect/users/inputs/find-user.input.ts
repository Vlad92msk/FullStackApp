import { InputType, Field } from '@nestjs/graphql'
import { StatusEnum } from '../interfaces/status'

@InputType()
export class FindUserInput {
  @Field({ nullable: true })
  id?: number

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  password?: string

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  status?: StatusEnum

  // @Field({ nullable: true })
  // role?: RoleEnum
}
