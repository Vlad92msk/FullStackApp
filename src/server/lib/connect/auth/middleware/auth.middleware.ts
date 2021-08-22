import { Injectable, NestMiddleware } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from '~server/lib/connect/users/user.service'
import { NextFunction, Request } from 'express'
import { TokenService } from '~server/lib/connect/tokens/token.service'
import * as moment from 'moment'
import { config } from 'dotenv'

config()

export enum AuthStatus {
  tokenDead,
  userUnAuthorisation,
  noUser,
  ok
}

export interface ExpressRequest extends Request {
  status: AuthStatus
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService
  ) {
  }

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    const requestCookieToken = req.headers.cookie?.split('=')[1]

    if (!requestCookieToken) {
      req.status = AuthStatus.userUnAuthorisation
      next()
      return
    }

    const decode = await this.tokenService.verifyToken(requestCookieToken)

    const { expireAt } = await this.tokenService.exists({ uid: decode.id, token: requestCookieToken })
    const tokenExpireAt = moment(expireAt)
    const now = moment()
    const difference = tokenExpireAt.diff(now, 'minutes')

    /**
     * Время токена истекло
     */
    if (difference < 0) {
      await this.tokenService.delete(decode.id, requestCookieToken)
      req.status = AuthStatus.tokenDead
      next()
      return
    }

    const user = await this.userService.findOneUserByParam({ id: decode.id })

    /**
     * Пользователь с данным токеном не найден
     */
    if (!user) {
      req.status = AuthStatus.noUser
      next()
      return
    }

    req.status = AuthStatus.ok
    next()
  }
}
