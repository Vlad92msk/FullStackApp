import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { GraphQLError } from 'graphql'
import * as bcrypt from 'bcrypt'
import * as moment from 'moment'

import { User } from '@server_lib/connect/users/entitys/user.entity'
import { UserService } from '../users/user.service'
import { TokenService } from '../tokens/token.service'
import { CreateUsersInput } from '../users/inputs/create-user.input'
import { StatusEnum } from '../users/interfaces/status'
import { SignInInput } from './inputs/signIn.input'

@Injectable()
export class AuthService {
  private readonly clientAppUrl: string

  constructor(
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
    const confirmLink = await this.sendConfirmation(user)
    return [user, confirmLink]
  }

  /**
   * Отправить подтверждение
   */
  async sendConfirmation(user: User) {
    const expireAt = await moment().add(1, 'day').toISOString()
    const token = await this.tokenService.generateToken(user)
    const confirmLink = `${this.clientAppUrl}/auth/confirm?token=${token}`
    console.log(confirmLink)

    /**
     *Отправляет письмо на почту
     */
    // await this.mailService.send({
    // 	"from": this.configService.get<string>('JS_CODE_MAIL'),
    // 	to: email,
    // 	subject: 'Verify User',
    // 	text: `
    //             <h3>Hello ${name}!</h3>
    //             <p>Please use this <a href="${confirmLink}">link</a> to confirm your account.</p>
    //         `,
    // });
    await this.tokenService.saveToken({ token, uid: user.id, expireAt })
    return confirmLink
  }

  /**
   * Войти
   */
  async signIn({ email, password }: SignInInput): Promise<[User, string]> {
    const user = await this.userService.findOneUserByParam({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status !== StatusEnum.active) {
        throw new GraphQLError('Учетная запись не подтверждена')
      }
      /**
       * Удаляет из базы старый токен
       */
      await this.tokenService.delete(user.id)

      const token = await this.tokenService.generateToken(user)
      const expireAt = moment().add(1, 'day').toISOString()

      await this.tokenService.saveToken({ token, expireAt, uid: user.id })
      return [user, token]
    }
    throw new GraphQLError('Указаны неверные реквизиты учетной записи')
  }

  /**
   * Подтверждение регистрации пользователя по ссылке
   */
  async confirmRegistrationToLink(token: string) {
    const data = await this.confirmUserToken(token)
    const user = await this.userService.findOneUserByParam({ id: data.id })
    await this.tokenService.delete(data.id, token)

    if (user && user.status === StatusEnum.pending) {
      try {
        return await this.userService.updateUser({ id: user.id }, { status: StatusEnum.active })
      } catch (e) {
        console.log('e', e)
      }
    }
    throw new GraphQLError('Неверные данные')
  }

  /**
   * Подтверждает наличие токена у пользователя
   */
  async confirmUserToken(token: string) {
    const decodeTokenObject = await this.tokenService.verifyToken(token)
    await this.tokenService.exists({ uid: decodeTokenObject.id, token })
    return decodeTokenObject
  }

  /**
   * Выйти
   */
  async signOut(token: string): Promise<boolean> {
    const decode = await this.tokenService.verifyToken(token)
    await this.tokenService.delete(decode.id, token)
    return true
  }
}
