import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ShopsService } from './shops.service';
import { GetTokenDto } from './dto/get-token.dto';
import { AuthGuard } from 'src/auth/auth.gard';
import { UserFromRequest } from 'src/auth/dto/user.dto';
import { UpdateShopDto } from './dto/update-shop.dto';

@Controller('shop')
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('/token')
  getToken(@Body() tokenDto: GetTokenDto, @Request() req) {
    return this.shopsService.getShopToken(tokenDto, req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get()
  getAll(@Request() req: UserFromRequest) {
    return this.shopsService.getAll(req.user.id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.shopsService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.shopsService.delete(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateShopDto) {
    return this.shopsService.update(id, dto);
  }
}
