import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { GetTokenDto } from './dto/get-token.dto';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller('shop/token')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  getToken(@Body() tokenDto: GetTokenDto, @Request() req) {
    return this.shopsService.getShopToken(tokenDto, req.user.id);
  }
}
