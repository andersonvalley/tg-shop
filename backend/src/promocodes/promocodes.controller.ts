import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.gard';
import { PromocodeService } from './promocodes.service';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto } from './dto/update-promocode.dto';

@Controller('promocode')
export class PromocodeController {
  constructor(private readonly promocodeService: PromocodeService) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  create(
    @Body() createDeliveryDto: CreatePromocodeDto,
    @Param('id') id: string,
  ) {
    return this.promocodeService.create(createDeliveryDto, id);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.promocodeService.findAll(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdatePromocodeDto,
  ) {
    return this.promocodeService.update(id, updateDeliveryDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promocodeService.remove(id);
  }
}
