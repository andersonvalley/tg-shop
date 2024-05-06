import { Controller, Get } from '@nestjs/common';
import { NoficationService } from './nofication.service';

@Controller('nofication')
export class NoficationController {
  constructor(private readonly noficationService: NoficationService) {}

  @Get()
  findAll() {
    return this.noficationService.get();
  }
}
