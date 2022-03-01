import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { from, Observable } from 'rxjs'

import { UpdateUserRolesInput } from '@server_lib/connect/users/inputs/update-userRoles.input'
import { User } from '@server_lib/connect/users/entitys/user.entity'
import { UserService } from './user.service'
import { CreateUsersInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import { FindUserInput } from './inputs/find-user.input'
import { AuthGuard } from '../auth/guards/auth-guard'

@UsePipes(new ValidationPipe())
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {
  }

  @Query(() => [User], { description: 'Найти всех юзеров' })
  // @UseGuards(AuthGuard)
  usersFindAll(): Observable<User[]> {
    return from(this.userService.findAllUsers())
  }

  @Query(() => [User], { description: 'Найти всех юзеров по условию' })
  usersFindAllByParam(@Args('params') params: FindUserInput): Observable<User[]> {
    return from(this.userService.findAllUsersByParam(params))
  }

  @Query(() => User, { description: 'Найти 1 юзера по условию' })
  usersFindOneByParam(@Args('params') params: FindUserInput): Observable<User> {
    return from(this.userService.findOneUserByParam(params))
  }

  @Mutation(() => User, { description: 'Обновить данные юзера' })
  usersUpdate(
    @Args('target') target: FindUserInput,
    @Args('param') param: UpdateUserInput
  ) {
    return from(this.userService.updateUser(target, param))
  }

  @Mutation(() => Boolean, { description: 'Дать юзеру новую роль' })
  usersUpdateGiveNewRole(
    @Args('target') target: FindUserInput,
    @Args('param') newRole: UpdateUserRolesInput
  ): Observable<boolean> {
    return from(this.userService.updateUserRoles(target, newRole))
  }

  @Mutation(() => User, { description: 'Создать юзера' })
  usersCreate(@Args('user') user: CreateUsersInput): Observable<User> {
    return from(this.userService.createUser(user))
  }

  @Mutation(() => User, { description: 'Удалить юзера' })
  usersDelete(@Args('userParam') userParam: FindUserInput) {
    return from(this.userService.deleteUser(userParam))
  }
}
