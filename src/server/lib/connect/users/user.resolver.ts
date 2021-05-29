import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { from, Observable } from 'rxjs'

import { UserService } from './user.service'
import { CreateUsersInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import { FindUserInput } from './inputs/find-user.input'
import { AuthGuard } from '../auth/guards/auth-guard'
import { Users } from '~server/lib/connect/users/entitys/user.entity'
import { UpdateUserRolesInput } from '~server/lib/connect/users/inputs/update-userRoles.input'

@UsePipes(new ValidationPipe())
@Resolver(() => Users)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [Users], { description: 'Найти всех юзеров' })
  @UseGuards(AuthGuard)
  usersFindAll(): Observable<Users[]> {
    return from(this.userService.findAllUsers())
  }

  @Query(() => [Users], { description: 'Найти всех юзеров по условию' })
  usersFindAllByParam(@Args('params') params: FindUserInput): Observable<Users[]> {
    return from(this.userService.findAllUsersByParam(params))
  }

  @Query(() => Users, { description: 'Найти 1 юзера по условию' })
  usersFindOneByParam(@Args('params') params: FindUserInput): Observable<Users> {
    return from(this.userService.findOneUserByParam(params))
  }

  @Mutation(() => Boolean, { description: 'Обновить данные юзера' })
  usersUpdate(@Args('target') target: FindUserInput, @Args('param') param: UpdateUserInput): Observable<boolean> {
    return from(this.userService.updateUser(target, param))
  }

  @Mutation(() => Boolean, { description: 'Дать юзеру новую роль' })
  usersUpdateGiveNewRole(
    @Args('target') target: FindUserInput,
    @Args('param') newRole: UpdateUserRolesInput
  ): Observable<boolean> {
    return from(this.userService.updateUserRoles(target, newRole))
  }

  @Mutation(() => Users, { description: 'Создать юзера' })
  usersCreate(@Args('user') user: CreateUsersInput): Observable<Users> {
    return from(this.userService.createUser(user))
  }

  @Mutation(() => Users, { description: 'Удалить юзера' })
  usersDelete(@Args('userParam') userParam: FindUserInput): Observable<Users> {
    return from(this.userService.deleteUser(userParam))
  }
}
