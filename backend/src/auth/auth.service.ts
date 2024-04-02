import {
  BadRequestException,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from 'src/auth/dto/user.dto';
import { Context, Telegraf } from 'telegraf';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CodeDto } from './dto/code.dto';
import { AuthToken } from './auth.tokens';

const message = '🔐 Получить код';
const codeValidMs = 30000;

@Injectable()
export class AuthService implements OnModuleInit {
  private timerId = null;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const bot = new Telegraf(process.env.BOT_REGISTER_TOKEN);

    bot.start((ctx) => {
      ctx.reply('👋', {
        reply_markup: {
          keyboard: [[{ text: message }]],
          resize_keyboard: true,
        },
      });
    });

    bot.hears(message, async (ctx) => {
      clearTimeout(this.timerId);
      this.timerId = null;
      const code = this.generateCode();
      await ctx.reply(`Код действителен ${codeValidMs / 1000} сек:`);
      await ctx.reply(code.toString());

      const tUser = ctx.from;
      const avatarUrl = String(await this.getAvatar(ctx, tUser.id));

      const user: UserDto = {
        telgramId: String(tUser.id),
        firstName: tUser.first_name,
        lastName: tUser.last_name,
        userName: tUser.username,
        isPremium: tUser.is_premium,
        languageCode: tUser.language_code,
        avatarUrl,
        code,
      };

      await this.auth(code, user);
    });

    bot.launch();
  }

  async auth(code: number, userDto: UserDto) {
    const user = await this.userRepository.findOne({
      where: { telegramId: userDto.telgramId },
    });

    if (user) {
      await this.userRepository.update(user.id, {
        code,
        avatarUrl: userDto.avatarUrl,
        firstName: user.firstName,
        lastName: user.lastName,
      });

      await this.destroyCode(user.id);
    } else {
      const newUser = this.userRepository.create(userDto);
      await this.userRepository.save(newUser);

      await this.destroyCode(newUser.id);
    }
  }

  async validateCode(dto: CodeDto) {
    const user = await this.userRepository.findOne({
      where: {
        code: dto.code,
      },
      relations: { shops: true },
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
      relations: { shops: true },
    });

    if (!user) {
      throw new UnauthorizedException(`Ошибка`);
    }

    const { accessToken } = await AuthToken.generateAccessToken(user);

    return { accessToken, user };
  }

  async getAvatar(ctx: Context, id: number) {
    const userProfilePhotos = await ctx.telegram.getUserProfilePhotos(id);

    if (userProfilePhotos.photos.length > 0) {
      const userAvatar = userProfilePhotos.photos[0][0];

      const fileId = userAvatar.file_id;
      const fileLink = await ctx.telegram.getFileLink(fileId);

      return fileLink;
    } else {
      return '';
    }
  }

  async destroyCode(id: string) {
    await new Promise<void>((resolve) => {
      this.timerId = setTimeout(async () => {
        await this.userRepository.update(id, {
          code: null,
        });
        resolve();
      }, codeValidMs);
    });
  }

  generateCode() {
    return Math.floor(Math.random() * 900000) + 100000;
  }
}
