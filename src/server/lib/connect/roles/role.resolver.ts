import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { from, Observable } from 'rxjs'

import { RoleService } from './role.service'
import { CreateRoleInput } from './inputs/create-role.input'
import { Role } from '~server/lib/connect/roles/entitys/role.entity'
import { FindRoleInput } from '~server/lib/connect/roles/inputs/find-role.input'
import { UsePipes, ValidationPipe } from '@nestjs/common'

@UsePipes(new ValidationPipe())
@Resolver(() => Role)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query(() => [Role], { description: 'Найти все роли' })
  rolesFindAll(): Observable<Role[]> {
    return from(this.roleService.getAllRoles())
  }

  @Query(() => Role, { description: 'Найти роль' })
  rolesFindOne(@Args('params') params: FindRoleInput): Observable<Role> {
    return from(this.roleService.getRoleByValue(params))
  }

  @Mutation(() => Role, { description: 'Создать роль' })
  rolesCreate(@Args('params') params: CreateRoleInput): Observable<Role> {
    return from(this.roleService.createRole(params))
  }

  @Mutation(() => Boolean, { description: 'Удалить роль' })
  rolesDelete(@Args('params') params: FindRoleInput): Observable<Role> {
    return from(this.roleService.deleteRole(params))
  }
}
