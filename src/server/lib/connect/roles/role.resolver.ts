import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { from, Observable } from 'rxjs'

import { RoleService } from './role.service'
import { CreateRoleInput } from './inputs/create-role.input'
import { Roles } from '~server/lib/connect/roles/entitys/role.entity'
import { FindRoleInput } from '~server/lib/connect/roles/inputs/find-role.input'

@Resolver(() => Roles)
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  @Query(() => [Roles], { description: 'Найти все роли' })
  rolesFindAll(): Observable<Roles[]> {
    return from(this.roleService.getAllRoles())
  }

  @Query(() => Roles, { description: 'Найти роль' })
  rolesFindOne(@Args('params') params: FindRoleInput): Observable<Roles> {
    return from(this.roleService.getRoleByValue(params))
  }

  @Mutation(() => Boolean, { description: 'Создать роль' })
  rolesCreate(@Args('params') params: CreateRoleInput): Observable<Roles> {
    return from(this.roleService.createRole(params))
  }

  @Mutation(() => Boolean, { description: 'Удалить роль' })
  rolesDelete(@Args('params') params: FindRoleInput): Observable<Roles> {
    return from(this.roleService.deleteRole(params))
  }
}
