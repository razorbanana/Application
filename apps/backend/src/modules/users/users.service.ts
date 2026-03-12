import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { EventsService } from '../events/events.service';
import { USERS_REPOSITORY } from 'src/constants';
import { RegisterDto } from '../auth/dto/register.dto';
import { JwtPayload } from 'src/utils/decorators/getUser.decorator';
import { UpdateUserDto } from './dto/UpdateUserDto';

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

  async findMyUser(userId: string){
    const user = await this.usersRepository.findOne({where: {id: userId}})
    if (user){
      const {id, password, ...userWithoutIdPassword} = user
      return userWithoutIdPassword
    }else{
      throw new UnauthorizedException()
    }
  }

  async findUserById(userId: string){
    const user = await this.usersRepository.findOne({where: {id: userId}})
    if (user){
      return user
    }else{
      throw new UnauthorizedException()
    }
  }

  async updateUserInformation(userId: string, updateUserDto: UpdateUserDto){
    await this.usersRepository.update({id: userId}, updateUserDto)
  }
}
