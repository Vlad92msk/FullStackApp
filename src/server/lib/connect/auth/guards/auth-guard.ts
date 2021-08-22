import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthStatus, ExpressRequest } from '~server/lib/connect/auth/middleware/auth.middleware'
import { authErrors } from '~server/lib/connect/auth/errors'

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context)
    const req: ExpressRequest = ctx.getContext().req

    switch (req.status) {
      case AuthStatus.userUnAuthorisation:
        throw new UnauthorizedException(authErrors.UNAUTHORIZED_USER);
      case AuthStatus.noUser:
        throw new UnauthorizedException(authErrors.UNCONFIRMED_USER);
      case AuthStatus.tokenDead:
        throw new UnauthorizedException(authErrors.SESSIONS_TIMED_OUT);
      case AuthStatus.ok:
        return true
      default: throw new UnauthorizedException(authErrors.UNEXPECTED_ERROR);
    }
  }
}
