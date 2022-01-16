import { Module } from '@nestjs/common'
import { ArticlesModule } from './articles/articles.module'
import { UserInterfaceModule } from './userInterface/userInterface.module'

@Module({
  imports: [ArticlesModule, UserInterfaceModule],
  exports: [ArticlesModule, UserInterfaceModule],
})
export class CosmoModule {}
