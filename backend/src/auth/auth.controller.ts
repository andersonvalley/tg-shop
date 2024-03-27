import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CodeDto } from './dto/code.dto';
import { Response, Request as req } from 'express';
import { AuthToken } from './auth.tokens';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async validateCode(
    @Body() dto: CodeDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const data = await this.authService.validateCode(dto);

    if (data.user) {
      const refreshToken = await AuthToken.generateRefreshToken(data.user);
      response.cookie('refresh-token', refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return data;
    } else {
      return data;
    }
  }

  @UsePipes(new ValidationPipe())
  @Post('/refresh')
  async refreshToken(
    @Req() request: req,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = request.cookies['refresh-token'];
    const data = await this.authService.refreshToken(token);

    console.log(data);

    const refreshToken = await AuthToken.generateRefreshToken(data.user);
    response.cookie('refresh-token', refreshToken, {
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return data;
  }

  @UsePipes(new ValidationPipe())
  @Post('/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('refresh-token', 'fdf', {
      httpOnly: true,
      maxAge: 1,
    });
    return { message: 'success' };
  }
}
