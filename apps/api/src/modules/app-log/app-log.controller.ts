import { Body, Controller, Post } from '@nestjs/common';
import { GqlCurrentUser } from '../auth/decorators/gql-current-user.decorator';
import { AppLogService } from './app-log.service';
import { CreateLogDto } from './create-log.dto';

@Controller('logs')
export class AppLogController {
  constructor(private readonly appLogService: AppLogService) {}

  @Post('log')
  handleLog(@Body() createLogDto: CreateLogDto, @GqlCurrentUser() user: Express.User) {
    console.log('logging app log..');
    this.appLogService.log(createLogDto, user);
  }
}
