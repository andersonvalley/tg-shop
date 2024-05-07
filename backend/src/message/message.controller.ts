import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth/auth.gard';
import { CreateMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.messageService.findAll(id);
  }

  @UseGuards(AuthGuard)
  @Get('/byId/:id')
  findOne(@Param('id') id: string) {
    return this.messageService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateMessageDto) {
    console.log(dto);
    return this.messageService.create(dto);
  }
}
