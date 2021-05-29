import { Injectable, NestMiddleware } from '@nestjs/common'
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

  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      req.status = AuthStatus.userUnAuthorisation
      next()
      return
    }
    const token = req.headers.authorization.split(' ')[1]

    try {
      const decode = await this.tokenService.verifyToken(token)
      const { expireAt } = await this.tokenService.exists({ uid: decode.id, token })

      const tokenExpireAt = moment(expireAt)
      const now = moment()
      const difference = tokenExpireAt.diff(now, 'minutes')
      /**
       * Время токена истекло
       */
      if (difference < 0) {
        await this.tokenService.delete(decode.id, token)
        next()
        return req.status = AuthStatus.tokenDead
      }

      const user = await this.userService.findOneUserByParam({ id: decode.id })

      /**
       * Пользователь с данным токеном не найден
       */
      if (!user) {
        next()
        return req.status = AuthStatus.noUser
      }

      req.status = AuthStatus.ok
      next()
    } catch (err) {
      req.status = AuthStatus.userUnAuthorisation
      next()
    }
  }
}
