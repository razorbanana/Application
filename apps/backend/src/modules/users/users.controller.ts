import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetUser } from 'src/utils/decorators/getUser.decorator';
import type { JwtPayload } from 'src/utils/decorators/getUser.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { EventResponseDto } from '../events/dto/responseDto/eventResponse.dto';
import LoginResponseDto, { UserWithoutIdPassword } from '../auth/dto/responseDto/loginResponse.dto';
import { YupValidationPipe } from 'src/utils/pipes/yup.pipe';
import { updateUserSchema } from './schemas/update-user.schema';

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

  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: "Returns a user object",
    type: UserWithoutIdPassword
  })
  @Get('me')
  async findMyUser(@GetUser() user: JwtPayload) {
    return await this.usersService.findMyUser(user.sub);
  }

  @UseGuards(AuthGuard)
  @ApiOkResponse({
    description: "Updates user's information"
  })
  @Patch('me')
  async updateMyUser(@GetUser() user: JwtPayload, @Body(new YupValidationPipe(updateUserSchema)) updateUserDto) {
    return await this.usersService.updateUserInformation(user.sub, updateUserDto);
  }
}
