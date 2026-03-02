import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { eventsProviders } from './events.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [EventsController],
  providers: [
    ...eventsProviders,
    EventsService
  ],
  exports: [EventsService]
})
export class EventsModule {}
