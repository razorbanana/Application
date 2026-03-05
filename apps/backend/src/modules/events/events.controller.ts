import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { LeaveEventDto } from './dto/leave-event.dto';
import { JoinEventDto } from './dto/join-event.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from 'src/utils/decorators/getUser.decorator';
import type { JwtPayload } from 'src/utils/decorators/getUser.decorator';
import { YupValidationPipe } from 'src/utils/pipes/yup.pipe';
import { joinEventSchema } from './schemas/join-event.schema';
import { leaveEventSchema } from './schemas/leave-event.schema';
import { createEventSchema } from './schemas/create-event.schema';
import { updateEventSchema } from './schemas/update-event.schema';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { OptionalAuthGuard } from '../auth/guards/optional.guard';
import { EventResponseDto } from './dto/responseDto/eventResponse.dto';
import { EventWithVisitorCount } from './dto/responseDto/eventWithVisitorCount';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AuthGuard)
  @ApiBody({type: CreateEventDto})
  @ApiOkResponse({
    description: 'The event has been successfully created.',
    type: EventResponseDto
  })
  @Post()
  async create(@GetUser() user: JwtPayload, @Body(new YupValidationPipe(createEventSchema)) createEventDto: CreateEventDto) {
    return await this.eventsService.create(user.sub, createEventDto);
  }

  @UseGuards(AuthGuard)
  @ApiBody({type: JoinEventDto})
  @ApiOkResponse({
    description: 'The user has successfully joined the event.'
  })
  @Post(':id/join')
  async join(@GetUser() user: JwtPayload, @Body(new YupValidationPipe(joinEventSchema)) joinEventDto: JoinEventDto) {
    await this.eventsService.join(user.sub, joinEventDto);
  }

  @UseGuards(AuthGuard)
  @ApiBody({type: LeaveEventDto})
  @ApiOkResponse({
    description: 'The user has successfully left the event.', 
  })
  @Post(':id/leave')
  async leave(@GetUser() user: JwtPayload, @Body(new YupValidationPipe(leaveEventSchema)) leaveEventDto: LeaveEventDto) {
    await this.eventsService.leave(user.sub, leaveEventDto);
  }

  @UseGuards(OptionalAuthGuard)
  @ApiOkResponse({
    description: 'Returns a list of all events with visitor counts and participation status.',
    type: [EventWithVisitorCount]
  })
  @Get()
  async findAll(@GetUser() user?: JwtPayload) {
    const userId = user ? user.sub : undefined
    return await this.eventsService.findAllWithVisitorCount(userId);
  }

  @ApiOkResponse({
    description: 'Returns details of a specific event.',
    type: EventResponseDto
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventsService.findOne(id);
  }

  @ApiBody({type: UpdateEventDto})
  @ApiOkResponse({
    description: 'The event has been successfully updated.',
    type: EventResponseDto
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body(new YupValidationPipe(updateEventSchema)) updateEventDto: UpdateEventDto) {
    return await this.eventsService.update(id, updateEventDto);
  }

  @ApiOkResponse({
    description: 'The event has been successfully deleted.',
    type: EventResponseDto
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.eventsService.remove(id);
  }
}
