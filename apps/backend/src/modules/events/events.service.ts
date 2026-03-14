import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LeaveEventDto } from './dto/leave-event.dto';
import { JoinEventDto } from './dto/join-event.dto';
import { Repository } from 'typeorm';
import { Event } from 'src/database/entities/event.entity';
import { Participant } from 'src/database/entities/participant.entity';
import { EVENTS_REPOSITORY, PARTICIPANTS_REPOSITORY} from 'src/constants';
import { EventWithVisitorCount } from './dto/responseDto/eventWithVisitorCount';
import { TagsService } from 'src/modules/tags/tags.service';
import { Tag } from 'src/database/entities/tag.entity';

@Injectable()
export class EventsService {

  constructor(
    @Inject(EVENTS_REPOSITORY)
    private eventsRepository: Repository<Event>,

    @Inject(PARTICIPANTS_REPOSITORY)
    private participantsRepository: Repository<Participant>,

    private readonly tagsService: TagsService
  ){}

  async create(userId: string, createEventDto: CreateEventDto) {
    const { tags, ...eventData } = createEventDto
    const event = this.eventsRepository.create(eventData)
    if (tags?.length) {
      const temp = await this.tagsService.findByNames(tags)
      event.tags = temp
    }
    const savedEvent = await this.eventsRepository.save(event)
    const participant = this.participantsRepository.create({userId, eventId: savedEvent.id, userRole: "organizer"})
    await this.participantsRepository.save(participant)
    return {
      ...event,
      visitorCount: 0,
      isJoined: true,
      isOrganizer: true,
      tags
    }
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
    .leftJoinAndSelect('event.tags', 'tag')
    .select('event.*') 
    .addSelect('COUNT(DISTINCT participant.userId)::int', 'visitorCount') 
    .groupBy('event.id')
    .addSelect(
      `json_agg(DISTINCT tag.name)
      FILTER (WHERE tag.id IS NOT NULL)`,
      'tags'
    )

    if (userId) {
      query
      .addSelect(
        `EXISTS(
          SELECT 1 FROM participant p 
          WHERE p."eventId" = event.id AND p."userId" = :userId
        )`, 
        'isJoined'
      )
      .addSelect(
        `EXISTS(
          SELECT 1 FROM participant p
          WHERE p."eventId" = event.id 
          AND p."userId" = :userId 
          AND p."userRole" = 'organizer'
        )`,
        'isOrganizer'
      )
      .setParameter('userId', userId);
    }

    const rawResults = await query.getRawMany();

    return rawResults.map(result => ({
      ...result,
      visitorCount: parseInt(result.visitorCount, 10),
      isJoined: result.isJoined === true || result.isJoined === 'true',
      isOrganizer: result.isOrganizer === true || result.isOrganizer === 'true'
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

  async findMyWithParticipants(userId: string){

    const participantRecords = await this.participantsRepository.find({
      where: {userId},
      relations: ['event']
    })

    const events = participantRecords.map(record => record.event)

    const eventsWithParticipants = await Promise.all(
      events.map(async (event) => {
        const participants = await this.findEventParticipants(event.id)
        const participantsWithoutUsername = participants.map(p => ({
          fullName: p.fullName,
          userRole: p.userRole
        }))
        return {
          ...event,
          participantsWithoutUsername
        }
      })
    )

    return eventsWithParticipants
  }

  async findAllPublicWithParticipants(){
    const events = await this.eventsRepository.find({
      where: {isPublic: true}
    })

    const eventsWithParticipants = await Promise.all(
      events.map(async (event) => {
        const participants = await this.findEventParticipants(event.id)
        const participantsWithoutUsername = participants.map(p => ({
          fullName: p.fullName,
          userRole: p.userRole
        }))
        return {
          ...event,
          participantsWithoutUsername
        }
      })
    )

    return eventsWithParticipants
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
    const event = await this.eventsRepository.findOne({
      where: { id },
      relations: ['tags'],
    });

    if (event === null){
      throw new BadRequestException()
    }

    Object.assign(event, updateEventDto)

    if (updateEventDto.tags) {
      const tags = await this.tagsService.findByNames(updateEventDto.tags);
      event.tags = tags; 
    }

    return this.eventsRepository.save(event);
  }

  async remove(id: string) {
    return this.eventsRepository.delete({id})
  }
}
