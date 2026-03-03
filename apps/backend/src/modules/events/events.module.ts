import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { eventsProviders } from './events.providers';
import { DatabaseModule } from 'src/database/database.module';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule)
],
  controllers: [EventsController],
  providers: [
    ...eventsProviders,
    EventsService
  ],
  exports: [EventsService]
})
export class EventsModule {}
