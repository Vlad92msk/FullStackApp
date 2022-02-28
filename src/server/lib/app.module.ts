import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConfigModule } from '@nestjs/config'
import { ConnectModule } from '~server/lib/connect/connection.module'
import { PortfolioModule } from '~server/lib/portfolio/portfolio.module'
import { NextStartModule } from '~server/lib/nextJStart/nextStart.module'
import { AuthMiddleware } from '~server/lib/connect/auth/middleware/auth.middleware'
import { CosmoModule } from '~server/lib/cosmo/cosmo.module'
import mainConfig from '../config/main.config'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mainConfig]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      installSubscriptionHandlers: true,
      // cors: {
      //   origin: 'https://studio.apollographql.com',
      //   credentials: true,
      // },
      context: ({ req, res }) => ({ req, res })
    }),
    ConnectModule,
    PortfolioModule,
    CosmoModule,
    NextStartModule
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
