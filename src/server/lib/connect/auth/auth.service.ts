import { BadRequestException, Injectable, MethodNotAllowedException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { SignOptions } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import * as _ from 'lodash'
import * as moment from 'moment'

import { UserService } from '../users/user.service'
import { TokenService } from '../tokens/token.service'
import { CreateUsersInput } from '../users/inputs/create-user.input'
import { TokenInput } from '../tokens/inputs/create-token.input'
import { StatusEnum } from '../users/interfaces/status'
import { Tokens } from '../tokens/entitys/token.entity'
import { SignInInput } from './inputs/signIn.input'
import { userSensitiveFieldsEnum } from '../users/interfaces/protected-fields'
import { Users } from '~server/lib/connect/users/entitys/user.entity'

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService // private readonly mailService: MailService
  ) {
    this.clientAppUrl = this.configService.get<string>('FE_APP_URL')
  }

  /**
   * Зарегистрироваться
   */
  async signUp(createUser: CreateUsersInput) {
    const user = await this.userService.createUser(createUser)
    await this.sendConfirmation(user)
    return user
  }

  /**
   * Войти
   */
  async signIn({ email, password }: SignInInput) {
    const user = await this.userService.findOneUserByParam({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status !== StatusEnum.active) {
        throw new MethodNotAllowedException()
      }
      const tokenPayload = {
        id: user.id,
        status: user.status,
        roles: user.roles,
      }
      const token = await this.generateToken(tokenPayload)
      const expireAt = moment().add(1, 'day').toISOString()

      await this.saveToken({
        token,
        expireAt,
        uid: user.id,
      })

      // const readableUser = user.toObject();
      // const readableUser: any = {...user};
      const readableUser = await Object.create(user)
      readableUser.accessToken = token

      await _.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum))
      console.log('fggg')
      return user
    }
    throw new BadRequestException('Invalid credentials')
  }

  async confirm(token: string) {
    const data = await this.verifyToken(token)
    const user = await this.userService.findOneUserByParam({ id: data.id })
    await this.tokenService.delete(data.id, token)

    if (user && user.status === StatusEnum.pending) {
      console.log('Статус пользователя обновлен1111111111')
      return await this.userService.updateUser({ id: user.id }, { status: StatusEnum.active })
    }
    throw new BadRequestException('Бред бред бред')
  }

  /**
   * Отправить подтверждение
   */
  async sendConfirmation({ id, status, roles, email, name }: Users) {
    const expiresIn = 60 * 60 * 24 // 24 hours
    const tokenPayload = { id, status, roles }
    const expireAt = await moment().add(1, 'day').toISOString()

    const token = await this.generateToken(tokenPayload, { expiresIn })
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`

    console.log(confirmLink)

    // await this.mailService.send({
    // 	"from": this.configService.get<string>('JS_CODE_MAIL'),
    // 	to: email,
    // 	subject: 'Verify User',
    // 	text: `
    //             <h3>Hello ${name}!</h3>
    //             <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
    //         `,
    // });
    return await this.saveToken({ token, uid: id, expireAt })
  }

  /**
   * Генерация токена
   */
  private async generateToken(data, options?: SignOptions) {
    return this.jwtService.sign(data, options)
  }

  private async verifyToken(token: string) {
    try {
      const data = await this.jwtService.verify(token)
      const tokenExists = await this.tokenService.exists({ uid: data.id })

      if (tokenExists) {
        return data
      }

      throw new UnauthorizedException('verifyToken dataError')
    } catch (error) {
      throw new UnauthorizedException('verifyTokenError')
    }
  }

  private async saveToken(createUserToken: TokenInput) {
    return await this.tokenService.create(createUserToken)
  }
}
