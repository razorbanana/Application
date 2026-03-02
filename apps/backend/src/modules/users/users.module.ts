import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EventsModule } from 'src/modules/events/events.module';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [EventsModule, DatabaseModule],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    UsersService
  ],
})
export class UsersModule {}
