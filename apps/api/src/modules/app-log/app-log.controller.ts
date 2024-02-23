import { Body, Controller, Post } from '@nestjs/common';
import { AppLogService } from './app-log.service';
import { CreateLogDto } from './create-log.dto';

@Controller('logs')
export class AppLogController {
  constructor(private readonly appLogService: AppLogService) {}

  @Post()
  handleLog(@Body() createLogDto: CreateLogDto) {
    this.appLogService.log(createLogDto);
  }
}
