import { BadRequestException, Injectable, MethodNotAllowedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'
import * as _ from 'lodash'
import * as moment from 'moment'

import { UserService } from '../users/user.service'
import { TokenService } from '../tokens/token.service'
import { CreateUsersInput } from '../users/inputs/create-user.input'
import { StatusEnum } from '../users/interfaces/status'
import { SignInInput } from './inputs/signIn.input'
import { userSensitiveFieldsEnum } from '../users/interfaces/protected-fields'
import { Users } from '~server/lib/connect/users/entitys/user.entity'

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
    await this.sendConfirmation(user)
    return user
  }

  /**
   * Отправить подтверждение
   */
  async sendConfirmation(user: Users) {
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
    return await this.tokenService.saveToken({ token, uid: user.id, expireAt })
  }

  /**
   * Войти
   */
  async signIn({ email, password }: SignInInput) {
    const user = await this.userService.findOneUserByParam({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      if (user.status !== StatusEnum.active) {
        throw new MethodNotAllowedException('Учетная запись не подтверждена')
      }

      const token = await this.tokenService.generateToken(user)
      const expireAt = moment().add(1, 'day').toISOString()

      await this.tokenService.saveToken({ token, expireAt, uid: user.id })

      // const readableUser = user.toObject();
      // const readableUser: any = {...user};
      const readableUser = await Object.create(user)
      readableUser.accessToken = token

      await _.omit<any>(readableUser, Object.values(userSensitiveFieldsEnum))
      return user
    }
    throw new BadRequestException('Указаны неверные реквизиты учетной записи')
  }

  /**
   * Подтверждение регистрации пользователя по ссылке
   */
  async confirmRegistrationToLink(token: string) {
    const data = await this.confirmUserToken(token)
    const user = await this.userService.findOneUserByParam({ id: data.id })
    await this.tokenService.delete(data.id, token)

    if (user && user.status === StatusEnum.pending) {
      return await this.userService.updateUser({ id: user.id }, { status: StatusEnum.active })
    }
    throw new BadRequestException('Неверные данные')
  }

  /**
   * Подтверждает наличие токена у пользователя
   */
  async confirmUserToken(token: string) {
      const decodeTokenObject = await this.tokenService.verifyToken(token)
      await this.tokenService.exists({ uid: decodeTokenObject.id, token })
      return decodeTokenObject
  }
}
