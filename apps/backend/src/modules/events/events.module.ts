import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { eventsProviders } from './events.providers';
import { DatabaseModule } from 'src/database/database.module';
import { forwardRef } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { OptionalAuthGuard } from '../auth/guards/optional.guard';
import { TagsModule } from 'src/modules/tags/tags.module';

@Module({
  imports: [
    DatabaseModule,
    forwardRef(() => AuthModule),
    forwardRef(() => OptionalAuthGuard),
    TagsModule
],
  controllers: [EventsController],
  providers: [
    ...eventsProviders,
    EventsService
  ],
  exports: [EventsService]
})
export class EventsModule {}
