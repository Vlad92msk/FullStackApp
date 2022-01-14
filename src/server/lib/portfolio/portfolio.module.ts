import { Module } from '@nestjs/common'
import { SkillsModule } from './skills/skills.module'
import { UserInterfaceModule } from './userInterface/userInterface.module'

@Module({
  imports: [SkillsModule, UserInterfaceModule],
  exports: [SkillsModule, UserInterfaceModule],
})
export class PortfolioModule {}
