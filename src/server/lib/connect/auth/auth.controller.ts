import { Controller, Post, Body, ValidationPipe, Get, Query } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUsersInput } from '../users/inputs/create-user.input'
import { ConfirmAccountInput } from './inputs/confirm-account.input'
import { from, Observable, of } from 'rxjs'
import { switchMap } from 'rxjs/operators'
import { Users } from '~server/lib/connect/users/entitys/user.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body(ValidationPipe) createUserDto: CreateUsersInput): Observable<Users> {
    return from(this.authService.signUp(createUserDto))
  }

  @Get('/confirm')
  confirm(@Query(ValidationPipe) query: ConfirmAccountInput): void {
    from([this.authService.confirm(query.token), true]).pipe(switchMap((a) => of(a)))
  }
}
