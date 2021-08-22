import { InputType, Field } from '@nestjs/graphql'
import { RoleEnum } from '~server/lib/connect/roles/interfaces/role'

@InputType()
export class UpdateUserRolesInput {
  @Field()
  role: RoleEnum
}
