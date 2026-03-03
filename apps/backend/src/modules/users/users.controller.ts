import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/auth.guard';
import { GetUser } from 'src/utils/decorators/getUser.decorator';
import type { JwtPayload } from 'src/utils/decorators/getUser.decorator';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('me/events')
  async findMyEvents(@GetUser() user: JwtPayload) {
    return await this.usersService.findMyEvents(user.sub);
  }
}
