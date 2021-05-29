import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { Repository } from 'typeorm'
import { PostgreConstants } from '~server/db/db.constants'
import { Tokens } from './entitys/token.entity'
import { TokenInput } from './inputs/create-token.input'
import { sign, verify } from 'jsonwebtoken'
import { Users } from '~server/lib/connect/users/entitys/user.entity'
import { config } from 'dotenv'
import { Roles } from '~server/lib/connect/roles/entitys/role.entity'
import { StatusEnum } from '~server/lib/connect/users/interfaces/status'

config()


@Injectable()
export class TokenService {
  constructor(
    @Inject(PostgreConstants.connect_db.repository)
    private readonly tokenRepository: Repository<Tokens>
  ) {}

  /**
   * Генерация токена
   */
  generateToken(user: Users):string {
    return sign(
      { id: user.id, status: user.status, roles: user.roles },
      process.env.JWT_SECRET_KEY,
    );
  }

  /**
   * Сохранение токена в БД
   */
  async saveToken(createUserToken: TokenInput) {
    const newToken = await this.tokenRepository.create(createUserToken)
    await this.tokenRepository.save(newToken)
    return newToken
  }

  /**
   * Проверяет есть ли у пользователя токен
   */
  async exists(param: { uid: number; token: string }) {
    const findToken = await this.tokenRepository.findOne(param)
    if (!findToken) {
      throw new UnauthorizedException('Токен не найден')
    }
    return findToken
  }

  /**
   * Подтверждение токена
   */
  verifyToken(token: string) {
    try {
      return verify(token, process.env.JWT_SECRET_KEY) as {id: number, status: StatusEnum, roles: Roles[]};
    } catch (error) {
      throw new UnauthorizedException('Ошибка подтверждения токена')
    }
  }

  /**
   * Удаляет токен у пользователя
   */
  async delete(uid: number, token: string) {
    const find = await this.tokenRepository.findOne({ uid, token })
    if (!find) {
      throw new UnauthorizedException('Пользователь с данным токеном не найден')
    }
    return await this.tokenRepository.delete(find)
  }
}
