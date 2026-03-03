import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EventsModule } from 'src/modules/events/events.module';
import { usersProviders } from './users.providers';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [
    EventsModule, 
    DatabaseModule, 
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [
    ...usersProviders,
    UsersService
  ],
  exports: [UsersService]
})
export class UsersModule {}
