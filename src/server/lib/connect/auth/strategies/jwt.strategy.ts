import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { TokenService } from '../../tokens/token.service'
import { Users } from '~server/lib/connect/users/entitys/user.entity'
import { config } from 'dotenv'

config()

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private readonly configService: ConfigService,
    private readonly tokenService: TokenService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      passReqToCallback: true,
    })
  }

  async validate(req, user: Partial<Users>) {
    console.log('req')
    // const tokens = req.headers.authorization.slice(7);
    const tokenExists = await this.tokenService.exists({ uid: user.id })
    if (tokenExists) {
      return user
    } else {
      console.log('qqqqqqqqq')
      throw new UnauthorizedException('Токен', 'dwedwed11111111111111111')
    }
  }
}
