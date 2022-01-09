import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ConnectModule } from '~server/lib/connect/connection.module'
import { PortfolioModule } from '~server/lib/portfolio/portfolio.module'
import { NextStartModule } from '~server/lib/nextJStart/nextStart.module'
import { AuthMiddleware } from '~server/lib/connect/auth/middleware/auth.middleware'
import { CosmoModule } from '~server/lib/cosmo/cosmo.module'


@Module({
  imports: [
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
    NextStartModule,
    CosmoModule
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
