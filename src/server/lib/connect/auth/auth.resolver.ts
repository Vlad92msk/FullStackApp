import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { CookieOptions } from 'express'
import { GraphQLError } from 'graphql'
import { from } from 'rxjs'

import { User } from '@server_lib/connect/users/entitys/user.entity'
import { Token } from '@server_lib/connect/users/decorators/user.decorator'
import { CookieEnum } from '@server_lib/connect/auth/types/cookie'
import { AuthService } from './auth.service'
import { CreateUsersInput } from '../users/inputs/create-user.input'
import { SignInInput } from './inputs/signIn.input'


@Resolver(() => User)
@UsePipes(new ValidationPipe())
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(() => User, { description: 'Зарегистрироваться' })
  authSignUp(@Args('user') createUserDto: CreateUsersInput) {
    return from(this.authService.signUp(createUserDto))
  }

  @Query(() => User, { description: 'Войти' })
  async authSignIn(
    @Context() context,
    @Token() userToken,
    @Args('signInInput') signInInput: SignInInput
  ) {
    if (userToken) throw new GraphQLError('Пользователь уже авторизован. Для повторного входа необходимо выйти из системы.')

    const [user, token] = await this.authService.signIn(signInInput)
    const options: CookieOptions = {
      expires: new Date(Date.now() + 86400e3)
    }

    context.res.cookie(CookieEnum.TOKEN, token, options)
    return user
  }

  @Mutation(() => Boolean, { description: 'Выйти' })
  async authSignOut(
    @Token() token,
    @Context() context
  ) {
    if (!token) return false


    await this.authService.signOut(token)

    context.res.cookie(CookieEnum.TOKEN, token, {
      expires: new Date(Date.now() - 1)
    })

    return true
  }
}
