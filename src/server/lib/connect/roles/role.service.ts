import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { PostgreConstants } from '~server/db/db.constants'
import { CreateRoleInput } from './inputs/create-role.input'
import { Roles } from '~server/lib/connect/roles/entitys/role.entity'
import { UserLoginAlreadyUsedException } from '~server/lib/connect/users/exceptions/userLoginAlreadyUsedException'
import { FindRoleInput } from '~server/lib/connect/roles/inputs/find-role.input'

@Injectable()
export class RoleService {
  constructor(
    @Inject(PostgreConstants.connect_db.repository)
    private readonly roleRepository: Repository<Roles>
  ) {}

  /**
   * Найти все роли
   */
  async getAllRoles() {
    return this.roleRepository.find({ relations: ['users'] })
  }

  /**
   * Найти 1 роль по условию
   */
  async getRoleByValue(where: FindRoleInput, relations?: string[]) {
    return await this.roleRepository.findOne({ where, relations })
  }

  /**
   * Создать роль
   */
  async createRole(input: CreateRoleInput) {
    const found = await this.getRoleByValue(input)
    if (found) {
      throw new UserLoginAlreadyUsedException('Такая роль уже существует')
    }
    const newRole = this.roleRepository.create(input)
    return this.roleRepository.save(newRole)
  }

  /**
   * Удалить роль
   */
  async deleteRole(input: FindRoleInput) {
    const found = await this.getRoleByValue(input)
    if (!found) {
      throw new UserLoginAlreadyUsedException('Такой роли не существует')
    } else {
      await this.roleRepository.delete(found)
      return found
    }
  }
}
