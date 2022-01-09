import { Module } from '@nestjs/common'
import { ArticlesProviders } from './providers/articles.providers'
import { ArticlesService } from './articles.service'
import { ArticlesResolver } from './articles.resolver'
import { DatabaseModule } from '~server/db/db.module'

@Module({
  imports: [DatabaseModule],
  providers: [...ArticlesProviders, ArticlesService, ArticlesResolver],
  exports: [ArticlesService],
})
export class ArticlesModule {}
