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
  app.setGlobalPrefix('api');

  app.enableCors({
    credentials: true,
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:4173',
      'http://172.20.10.2:5173',
    ],
  });

  await app.listen(5501);
}
bootstrap();
