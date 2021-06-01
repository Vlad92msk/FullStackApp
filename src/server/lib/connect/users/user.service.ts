import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'

import { PostgreConstants } from '~server/db/db.constants'
import { UserLoginAlreadyUsedException } from './exceptions/userLoginAlreadyUsedException'
import { StatusEnum } from './interfaces/status'
import { CreateUsersInput } from './inputs/create-user.input'
import { UpdateUserInput } from './inputs/update-user.input'
import { FindUserInput } from './inputs/find-user.input'
import { User } from '~server/lib/connect/users/entitys/user.entity'
import { RoleService } from '~server/lib/connect/roles/role.service'
import { RoleEnum } from '~server/lib/connect/roles/interfaces/role'
import { UpdateUserRolesInput } from '~server/lib/connect/users/inputs/update-userRoles.input'

@Injectable()
export class UserService {
  private readonly saltRounds = 10

  constructor(
    @Inject(PostgreConstants.connect_db.repository)
    private readonly userRepository: Repository<User>,
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
  public findAllUsersByParam = async (where: FindUserInput, relations?: string[]): Promise<User[]> => {
    return await this.userRepository.find({ where, relations })
  }

  /**
   * Найти 1 юзера по условию
   */
  public findOneUserByParam = async (where: FindUserInput) => {
    return await this.userRepository.findOne({ where })
  }

  /**
   * Обновить данные юзера
   */
  public updateUser = async (target: FindUserInput, param: UpdateUserInput) => {
    const find = await this.findOneUserByParam(target)
    if (find) {
      return await this.userRepository.update({ id: target.id }, param)
    }
    throw new UserLoginAlreadyUsedException('Пользователь не найден')
  }

  /**
   * Добавить роль пользователю
   */
  public updateUserRoles = async (target: FindUserInput, { role }: UpdateUserRolesInput): Promise<boolean> => {
    const findUser = await this.findOneUserByParam(target)
    if (findUser) {
      const findRole = await this.roleService.getRoleByValue({ value: role })
      const updateUser = await this.userRepository.create({
        ...findUser,
        roles: [...findUser.roles, findRole],
        uRoles: [...findUser.uRoles, findRole.value]
      })
      await this.userRepository.save(updateUser)
      return true
    }
    throw new UserLoginAlreadyUsedException('Пользователь не найден')
  }

  /**
   * Удалить роль у пользователя
   * TODO: Не тестировал
   */
  public deleteUserRoles = async (target: FindUserInput, { role }: UpdateUserRolesInput): Promise<boolean> => {
    const findUser = await this.findOneUserByParam(target)
    if (findUser) {
      const findRole = await this.roleService.getRoleByValue({ value: role })
      const updateUser = await this.userRepository.create({
        ...findUser,
        roles: findUser.roles.filter(role => role.id !== findRole.id),
        uRoles: findUser.uRoles.filter(role => role !== findRole.value)
      })
      await this.userRepository.save(updateUser)
      return true
    }
    throw new UserLoginAlreadyUsedException('Пользователь не найден')
  }

  /**
   * Создать юзера
   */
  public createUser = async (user: CreateUsersInput): Promise<User> => {
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
        uRoles: [RoleEnum.visitor]
      })

      return await this.userRepository.manager.save(newUser)
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
      return await this.userRepository.delete({id: found.id})
    }
  }
}
