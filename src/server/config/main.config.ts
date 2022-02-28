import { registerAs } from '@nestjs/config'

export default registerAs('main', () => ({
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
}));
