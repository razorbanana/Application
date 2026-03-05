import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from 'src/utils/decorators/getUser.decorator';
import type { JwtPayload } from 'src/utils/decorators/getUser.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { EventResponseDto } from '../events/dto/responseDto/eventResponse.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: "Returns a list of all events to which the user has joined",
    type: [EventResponseDto]
  })
  @Get('me/events')
  async findMyEvents(@GetUser() user: JwtPayload) {
    return await this.usersService.findMyEvents(user.sub);
  }
}
