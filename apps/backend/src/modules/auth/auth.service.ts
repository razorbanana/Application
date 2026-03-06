import { BadRequestException, forwardRef, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Inject } from '@nestjs/common';
import LoginResponseDto from './dto/responseDto/loginResponse.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService
  ){}

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const user = await this.usersService.findByNameOrEmail(loginDto.identifier)
    if (!user){
      throw new NotFoundException("we did not find this user")
    }
    const result = await bcrypt.compare(loginDto.password, user.password)
    if (!result){
      throw new UnauthorizedException("we have checked and this password is very incorrect")
    }
    const payload = {
      sub: user.id, 
      username: user.username
    }
    const {id, password, ...userWithoutIdPassword} = user
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutIdPassword
    }
  }

  async register(registerDto: RegisterDto): Promise<LoginResponseDto> {
    const user = await this.usersService.create(registerDto)
    const payload = {
      sub: user.id, 
      username: user.username
    }
    const {id, password, ...userWithoutIdPassword} = user
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: userWithoutIdPassword
    }
  }

}
