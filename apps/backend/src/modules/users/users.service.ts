import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { USERS_REPOSITORY } from 'src/constants';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {

  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRepository: Repository<User>,
    private eventsService: EventsService
  ){}

  async create(registerDto: RegisterDto){
    console.log(JSON.stringify(registerDto))
    const user = this.usersRepository.create(registerDto)
    return await this.usersRepository.save(user)
  }

  async findMyEvents(id: string) {
    return this.eventsService.findUserEvents(id)
  }

  async findByNameOrEmail(credentials: string){
    return await this.usersRepository.findOne({where: [
      {username: credentials},
      {email: credentials}
    ]})
  }
}
