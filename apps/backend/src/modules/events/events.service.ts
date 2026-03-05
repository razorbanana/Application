import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LeaveEventDto } from './dto/leave-event.dto';
import { JoinEventDto } from './dto/join-event.dto';
import { Repository } from 'typeorm';
import { Event, type EventWithVisitorCount } from 'src/database/entities/event.entity';
import { Participant } from 'src/database/entities/participant.entity';
import { EVENTS_REPOSITORY, PARTICIPANTS_REPOSITORY } from 'src/constants';

@Injectable()
export class EventsService {

  constructor(
    @Inject(EVENTS_REPOSITORY)
    private eventsRepository: Repository<Event>,

    @Inject(PARTICIPANTS_REPOSITORY)
    private participantsRepository: Repository<Participant>
  ){}

  async create(userId: string, createEventDto: CreateEventDto) {
    const event = await this.eventsRepository.save(this.eventsRepository.create(createEventDto))
    this.participantsRepository.create({userId, eventId: event.id, userRole: "organizer"})
    return event
  }

  async join(userId: string, joinEventDto: JoinEventDto) {
    const participant = this.participantsRepository.create({
      ...joinEventDto,
      userId,
    });

    return this.participantsRepository.save(participant);
  }
  
  async leave(userId: string, leaveEventDto: LeaveEventDto) {
    return this.participantsRepository.delete({
      userId,
      eventId: leaveEventDto.eventId
    });
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find()
  }

  async findAllWithVisitorCount(): Promise<EventWithVisitorCount[]> {
    const query = this.eventsRepository
    .createQueryBuilder('event')
    .leftJoin('event.participants', 'participant', 'participant.userRole = :role', {role: "visitor"})
    .select('event.*') 
    .addSelect('COUNT(participant.userId)::int', 'visitorCount') 
    .groupBy('event.id');

    const rawResults = await query.getRawMany();

    return rawResults.map(result => ({
      ...result,
      visitorCount: parseInt(result.visitorCount, 10) 
    }));
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
