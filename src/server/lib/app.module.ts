import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConnectModule } from '~server/lib/connect/connection.module'
import { PortfolioModule } from '~server/lib/portfolio/portfolio.module'
import { NextStartModule } from '~server/lib/nextJStart/nextStart.module'




@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
    ConnectModule,
    PortfolioModule,
    NextStartModule,
  ],
})
export class AppModule {}
