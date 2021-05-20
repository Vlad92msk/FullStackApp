import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { PostgreConstants } from '../../../db/db.constants'
import { Tokens } from './entitys/token.entity'
import { TokenInput } from './inputs/create-token.input'

@Injectable()
export class TokenService {
  constructor(
    @Inject(PostgreConstants.connect_db.repository)
    readonly tokenRepository: Repository<Tokens>
  ) {}

  async create(createUserToken: TokenInput) {
    const newToken = await this.tokenRepository.create(createUserToken)
    await this.tokenRepository.save(newToken)
    return newToken
  }

  async delete(uid: number, token: string) {
    const find = await this.tokenRepository.findOne({ uid })
    if (find) {
      return await this.tokenRepository.delete(find)
    }
  }

  async deleteAll(uid: number) {
    return await this.tokenRepository.delete({ uid })
  }

  async exists(param: { uid: number; token?: string }) {
    console.log(param)
    const findToken = await this.tokenRepository.findOne(param)
    if (findToken) {
      return true
    }
  }
}
