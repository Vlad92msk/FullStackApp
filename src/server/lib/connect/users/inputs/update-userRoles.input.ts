import { InputType, Field } from '@nestjs/graphql'
import { RoleEnum } from '@server_lib/connect/roles/interfaces/role'

@InputType()
export class UpdateUserRolesInput {
  @Field()
  role: RoleEnum
}
