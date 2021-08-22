import { Skill } from '~server/lib/portfolio/skills/entitys/skills.entity'
import { User } from '~server/lib/connect/users/entitys/user.entity'

export type SkillsQueryModel = {
  findAllSkills: [Skill]
}

export interface UserQueryModel {
  findAllUsers: [User]
  findAllUsersByParam: [User]
  findOneUserByParam: User
  signIn: User
  authSignIn: User
}
