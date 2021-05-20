import { Skills } from '~server/lib/portfolio/skills/entitys/skills.entity'
import { Users } from '~server/lib/connect/users/entitys/user.entity'

export type SkillsQueryModel = {
  findAllSkills: [Skills]
}

export interface UserQueryModel {
  findAllUsers: [Users]
  findAllUsersByParam: [Users]
  findOneUserByParam: Users
  signIn: Users
}
