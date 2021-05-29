import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUsersInput } from '../users/inputs/create-user.input'
import { ConfirmAccountInput } from './inputs/confirm-account.input'
import { SignInInput } from './inputs/signIn.input'
import { Users } from '~server/lib/connect/users/entitys/user.entity'
import { from } from 'rxjs'

@Resolver(() => Users)
@UsePipes(new ValidationPipe())
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Users)
  authSignUp(@Args('user') createUserDto: CreateUsersInput) {
    return from(this.authService.signUp(createUserDto))
  }

  @Query(() => Users)
  authSignIn(@Args('user') signInInput: SignInInput) {
    return from(this.authService.signIn(signInInput))
  }

  // @Query(() => Boolean)
  // authConfirm(@Args('query') query: ConfirmAccountInput) {
  // 	this.authService.confirmRegistrationToLink(query.tokens);
  // 	return true
  // }
}
