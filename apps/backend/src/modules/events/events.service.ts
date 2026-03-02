import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LeaveEventDto } from './dto/leave-event.dto';
import { JoinEventDto } from './dto/join-event.dto';
import { Repository } from 'typeorm';
import { Event } from 'src/database/entities/event.entity';
import { Participant } from 'src/database/entities/participant.entity';

@Injectable()
export class EventsService {

  constructor(
    @Inject("EVENTS_REPOSITORY")
    private eventsRepository: Repository<Event>,

    @Inject("PARTICIPANTS_REPOSITORY")
    private participantsRepository: Repository<Participant>
  ){}

  async create(createEventDto: CreateEventDto) {
    const event = this.eventsRepository.create(createEventDto);
    return await this.eventsRepository.save(event)
  }

  async join(joinEventDto: JoinEventDto) {
    return this.participantsRepository.create(joinEventDto);
  }
  
  async leave(leaveEventDto: LeaveEventDto) {
    return this.participantsRepository.create(leaveEventDto);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find()
  }

  async findOne(id: string) {
    return this.eventsRepository.findOneBy({id});
  }

  async findUserEvents(userId: string){
    const participantRecords = await this.participantsRepository.find({
      where: {userId},
      relations: ['event']
    })
    return participantRecords.map(record => record.event)
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventsRepository.update({id}, updateEventDto)
  }

  async remove(id: string) {
    return this.eventsRepository.delete({id})
  }
}
