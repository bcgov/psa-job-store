import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsService } from './event.service';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventModule {}
