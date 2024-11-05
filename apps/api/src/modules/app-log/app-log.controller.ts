import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AppLogService } from './app-log.service';
import { CreateLogDto } from './create-log.dto';

@Controller('logs')
export class AppLogController {
  constructor(private readonly appLogService: AppLogService) {}

  @Post('log')
  handleLog(@Body() createLogDto: CreateLogDto, @CurrentUser() user: Express.User) {
    console.log('logging app log..');
    this.appLogService.log(createLogDto, user);
  }
}
