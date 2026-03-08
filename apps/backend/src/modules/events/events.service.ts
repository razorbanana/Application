import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LeaveEventDto } from './dto/leave-event.dto';
import { JoinEventDto } from './dto/join-event.dto';
import { Repository } from 'typeorm';
import { Event } from 'src/database/entities/event.entity';
import { Participant } from 'src/database/entities/participant.entity';
import { EVENTS_REPOSITORY, PARTICIPANTS_REPOSITORY } from 'src/constants';
import { JwtPayload } from 'src/utils/decorators/getUser.decorator';
import { EventWithVisitorCount } from './dto/responseDto/eventWithVisitorCount';

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

    this.participantsRepository.save(participant);
  }
  
  async leave(userId: string, leaveEventDto: LeaveEventDto) {
    this.participantsRepository.delete({
      userId,
      eventId: leaveEventDto.eventId
    });
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find()
  }

  async findAllWithVisitorCount(userId?:string): Promise<EventWithVisitorCount[]> {
    const query = this.eventsRepository.createQueryBuilder('event')

    if (!userId){
      query.where('event.isPublic = :isPublic', { isPublic: true })
    }

    query.leftJoin('event.participants', 'participant', 'participant.userRole = :role', {role: "visitor"})
    .select('event.*') 
    .addSelect('COUNT(participant.userId)::int', 'visitorCount') 
    .groupBy('event.id');

    if (userId) {
      query.addSelect(
        `EXISTS(
          SELECT 1 FROM participant p 
          WHERE p."eventId" = event.id AND p."userId" = :userId
        )`, 
        'isJoined'
      ).setParameter('userId', userId);
    }

    const rawResults = await query.getRawMany();

    return rawResults.map(result => ({
      ...result,
      visitorCount: parseInt(result.visitorCount, 10),
      isJoined: result.isJoined === true || result.isJoined === 'true'
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

  async findEventParticipants(eventId: string){
    const participantRecords = await this.participantsRepository.find({
      where: {eventId},
      relations: ['user']
    })
    return participantRecords.map(record => ({
      username: record.user.username,
      fullName: record.user.fullName,
      userRole: record.userRole
    }))
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    return this.eventsRepository.update({id}, updateEventDto)
  }

  async remove(id: string) {
    return this.eventsRepository.delete({id})
  }
}
