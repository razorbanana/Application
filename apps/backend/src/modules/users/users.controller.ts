import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me/events')
  async findMyEvents(@Param('id') id: string) {
    return await this.usersService.findMyEvents(id);
  }
}
