import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { YupValidationPipe } from 'src/utils/pipes/yup.pipe';
import { loginSchema } from './schemas/login.schema';
import { registerScheme } from './schemas/register.schema';
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({type: RegisterDto})
  register(@Body(new YupValidationPipe(registerScheme)) registerDto: RegisterDto) {
    console.log(registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiBody({type: LoginDto})
  login(@Body(new YupValidationPipe(loginSchema)) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
