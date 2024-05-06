import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeDto } from './dto/code.dto';
import { AuthToken } from './auth.tokens';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async validateCode(dto: CodeDto) {
    const telegram_id = await this.redis.get(dto.code);

    if (!telegram_id) {
      throw new BadRequestException(`Код не действителен, получите новый`);
    }

    const user = await this.userRepository.findOne({
      where: { telegram_id },
      relations: { shops_: true },
    });

    if (!user) {
      throw new BadRequestException(`Код не действителен, получите новый`);
    }

    const { accessToken } = await AuthToken.generateAccessToken(user);

    return { accessToken, user };
  }

  async refreshToken(token: string) {
    const userData = await AuthToken.validateRefreshToken(token);

    if (!userData) {
      throw new UnauthorizedException(`Невалидный токен`);
    }

    const user = await this.userRepository.findOne({
      where: { id: userData.id },
      relations: { shops_: true },
    });

    if (!user) {
      throw new UnauthorizedException(`Ошибка`);
    }

    const { accessToken } = await AuthToken.generateAccessToken(user);

    return { accessToken, user };
  }
}
