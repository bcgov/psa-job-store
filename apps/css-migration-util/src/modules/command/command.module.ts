import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MigrateCommand } from './commands/migrate/migrate.command';
import { CssApiService } from './services/css-api.service';

@Module({ imports: [HttpModule], providers: [MigrateCommand, CssApiService] })
export class CommandModule {}
