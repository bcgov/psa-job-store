import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { SeedModule } from './modules/seeds/seed.module';
import { SeedService } from './modules/seeds/seed.service';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.enableCors();
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: false, transform: true }));

  await app.listen(4000);

  // Get an instance of the SeedService
  const seed = app.select(SeedModule);
  const seedService = seed.get(SeedService);
  // console.log(seed);
  // console.log(seedService);
  console.log('call seed service');
  // Call the applySeeds method
  await seedService.applySeeds();
}
bootstrap();
