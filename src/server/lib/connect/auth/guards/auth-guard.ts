import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthStatus, ExpressRequest } from '~server/lib/connect/auth/middleware/auth.middleware'

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const req: ExpressRequest = ctx.getContext().req

    switch (req.status) {
      case AuthStatus.userUnAuthorisation:
        throw new UnauthorizedException('Пользователь не авторизован');
      case AuthStatus.noUser:
        throw new UnauthorizedException('Пользователь не подтвержден');
      case AuthStatus.tokenDead:
        throw new UnauthorizedException('Время сессии истекло, просьба авторизоваться');
      case AuthStatus.ok:
        return true
      default: throw new UnauthorizedException('Непредвиденная ошибка');
    }
  }
}
