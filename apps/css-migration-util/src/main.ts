import { Logger } from '@nestjs/common';
import { CommandFactory } from 'nest-commander';
import { CommandModule } from './modules/command/command.module';

async function bootstrap() {
  const app = await CommandFactory.createWithoutRunning(CommandModule, new Logger());
  await CommandFactory.runApplication(app);
}
bootstrap();
