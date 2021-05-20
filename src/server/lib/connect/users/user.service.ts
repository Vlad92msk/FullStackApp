import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { PostgreConstants } from '~server/db/db.constants'
import { UserLoginAlreadyUsedException } from './exceptions/userLoginAlreadyUsedException'
import { StatusEnum } from './interfaces/status'
import { CreateUsersInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import { FindUserInput } from './inputs/find-user.input'
import { Users } from '~server/lib/connect/users/entitys/user.entity'
import { RoleService } from '~server/lib/connect/roles/role.service'
import { RoleEnum } from '~server/lib/connect/roles/interfaces/role'

@Injectable()
export class UserService {
  private readonly saltRounds = 10

  constructor(
    @Inject(PostgreConstants.connect_db.repository)
    private readonly userRepository: Repository<Users>,
    private readonly roleService: RoleService
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds)
    return await bcrypt.hash(password, salt)
  }

  /**
   * Найти всех юзеров
   */
  public findAllUsers = async () => {
    return await this.userRepository.find({ relations: ['roles'] })
  }

  /**
   * Найти всех юзеров по условию
   */
  public findAllUsersByParam = async (params: FindUserInput): Promise<Users[]> => {
    return await this.userRepository.find({ where: params, relations: ['roles'] })
  }

  /**
   * Найти 1 юзера по условию
   */
  public findOneUserByParam = async (params: FindUserInput) => {
    return await this.userRepository.findOne({ where: params })
  }

  /**
   * Обновить данные юзера
   */
  public updateUser = async (target: FindUserInput, param: UpdateUserInput): Promise<Users> => {
    const find = await this.findOneUserByParam(target)
    if (find) {
      await this.userRepository.update(find, param)
    }
    return find
  }

  /**
   * Создать юзера
   */
  public createUser = async (user: CreateUsersInput): Promise<Users> => {
    const found = await this.findOneUserByParam(user)

    if (found) {
      throw new UserLoginAlreadyUsedException('Такой пользователь существует')
    } else {
      const hash = await this.hashPassword(user.password)
      const role = await this.roleService.getRoleByValue({ value: RoleEnum.visitor })

      const newUser = this.userRepository.create({
        name: user.name,
        email: user.email,
        password: hash,
        roles: [role],
        status: StatusEnum.pending,
      })

      await this.userRepository.manager.save(newUser)
      return newUser
    }
  }

  /**
   * Удалить юзера
   */
  public deleteUser = async (userParam: FindUserInput) => {
    const found = await this.findOneUserByParam(userParam)
    if (!found) {
      throw new UserLoginAlreadyUsedException('Такого пользователя не существует')
    } else {
      await this.userRepository.delete(found)
      return found
    }
  }
}