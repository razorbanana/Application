import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { YupValidationPipe } from 'src/utils/pipes/yup.pipe';
import { loginSchema } from './schemas/login.schema';
import { registerScheme } from './schemas/register.schema';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({type: RegisterDto})
  @ApiOkResponse({
    description: "JWT token and user object are returned",
    example: {
      access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmZjNDBjMC1kMjk2LTQ2YjQtODZiZi1lOTY3MzRhODc3N2UiLCJ1c2VybmFtZSI6ImJlbmxlZSIsImlhdCI6MTc3Mjc5NTc3OSwiZXhwIjoxNzcyNzk3NTc5fQ.V7Plbln8eR-YSHwYy5JJ8Pev4BF6tx1Hr-L0z4Mt-oI",
    user: {
        username: "benlee",
        email: "ben.lee@example.com",
        fullName: "Benjamin Lee",
        city: "New York"
    }}
  })
  @Post('register')
  register(@Body(new YupValidationPipe(registerScheme)) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOkResponse({
    description: "JWT token and user object are returned",
    example: {
      access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmZjNDBjMC1kMjk2LTQ2YjQtODZiZi1lOTY3MzRhODc3N2UiLCJ1c2VybmFtZSI6ImJlbmxlZSIsImlhdCI6MTc3Mjc5NTc3OSwiZXhwIjoxNzcyNzk3NTc5fQ.V7Plbln8eR-YSHwYy5JJ8Pev4BF6tx1Hr-L0z4Mt-oI",
    user: {
        username: "benlee",
        email: "ben.lee@example.com",
        fullName: "Benjamin Lee",
        city: "New York"
    }}
  })
  @ApiBody({type: LoginDto})
  login(@Body(new YupValidationPipe(loginSchema)) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
