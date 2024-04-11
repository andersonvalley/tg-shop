import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoficationService } from './nofication.service';
import { CreateNoficationDto } from './dto/create-nofication.dto';
import { UpdateNoficationDto } from './dto/update-nofication.dto';

@Controller('nofication')
export class NoficationController {
  constructor(private readonly noficationService: NoficationService) {}

  @Post()
  create(@Body() createNoficationDto: CreateNoficationDto) {
    return this.noficationService.create(createNoficationDto);
  }

  @Get()
  findAll() {
    return this.noficationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noficationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoficationDto: UpdateNoficationDto) {
    return this.noficationService.update(+id, updateNoficationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noficationService.remove(+id);
  }
}
