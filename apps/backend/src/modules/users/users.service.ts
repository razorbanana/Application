import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { USERS_REPOSITORY } from 'src/constants';

@Injectable()
export class UsersService {

  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: Repository<User>,
    private eventsService: EventsService
  ){}

  async findMyEvents(id: string) {
    return this.eventsService.findUserEvents(id)
  }
}
