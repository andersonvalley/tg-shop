import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';

export class AuthToken {
  private static jwtService: JwtService;

  static setJwtService(jwtService: JwtService) {
    AuthToken.jwtService = jwtService;
  }

  static async generateAccessToken(user: UserEntity) {
    const token = await AuthToken.jwtService.signAsync({
      id: user.id,
    });

    return {
      accessToken: token,
    };
  }

  static async generateRefreshToken(user: UserEntity) {
    return await this.jwtService.signAsync(
      {
        id: user.id,
      },
      { expiresIn: '30d' },
    );
  }

  static async validateRefreshToken(token: string) {
    try {
      const user = await this.jwtService.verifyAsync(token);
      return user;
    } catch (error) {
      return null;
    }
  }
}
