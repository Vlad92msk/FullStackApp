import { Module } from '@nestjs/common'

import { DatabaseModule } from '@server_db/db.module'
import { ArticlesProviders } from './providers/articles.providers'
import { ArticlesService } from './articles.service'
import { ArticlesResolver } from './articles.resolver'

@Module({
  imports: [DatabaseModule],
  providers: [...ArticlesProviders, ArticlesService, ArticlesResolver],
  exports: [ArticlesService],
})
export class ArticlesModule {}
