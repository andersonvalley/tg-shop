import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { AuthGuard } from 'src/auth/auth.gard';
import { CreateMessageDto, getMessageDto } from './dto/create-message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.messageService.findAll(id);
  }

  @UseGuards(AuthGuard)
  @Post('/id')
  findOne(@Body() dto: getMessageDto) {
    return this.messageService.findOne(dto);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() dto: CreateMessageDto) {
    return this.messageService.create(dto);
  }
}
