import { Module } from '@nestjs/common'
import { SkillsProviders } from './providers/skills.providers'
import { SkillsService } from './skills.service'
import { SkillsResolver } from './skills.resolver'
import { DatabaseModule } from '~server/db/db.module'

@Module({
  imports: [DatabaseModule],
  providers: [...SkillsProviders, SkillsService, SkillsResolver],
  exports: [SkillsService],
})
export class SkillsModule {}
