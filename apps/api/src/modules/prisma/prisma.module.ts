import { Global, Module } from '@nestjs/common';
import { PGLitePrismaService } from './pglite-prisma.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: PrismaService,
      useFactory: () => {
        // eventsService: EventsService
        if (process.env.E2E_TESTING === 'true' && process.env.NODE_ENV != 'development')
          return new PGLitePrismaService(); //eventsService
        else return new PrismaService(); // eventsService
      },
      // inject: [EventsService],
    },
  ],
  exports: [PrismaService],
})
export class PrismaModule {}
