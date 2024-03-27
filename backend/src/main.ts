import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthToken } from './auth/auth.tokens';
import { JwtService } from '@nestjs/jwt';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const jwtService = app.get(JwtService);
  AuthToken.setJwtService(jwtService);

  app.use(cookieParser());

  await app.listen(5501);
}
bootstrap();
