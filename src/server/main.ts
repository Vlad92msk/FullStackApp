import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { config } from 'dotenv'
import { AppModule } from '~server/lib/app.module'

config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.enableCors()

  const config = await app.get(ConfigService)
  const port = Number(config.get<number>('main.port'))
  const host = String(config.get<string>('main.host'))

  await app.listen(port, () => {
    console.log(`Сервер доступен - http://${host}:${port}/graphql`)
  })

}

bootstrap()
