import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { YupValidationPipe } from 'src/utils/pipes/yup.pipe';
import { loginSchema } from './schemas/login.schema';
import { registerScheme } from './schemas/register.schema';
import { ApiBody, ApiOkResponse } from '@nestjs/swagger';
import RefreshDto from './dto/refresh.dto';
import { refreshSchema } from './schemas/refresh.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({type: RegisterDto})
  @ApiOkResponse({
    description: "JWT tokens and user object are returned",
    example: {
      access_token: "eyJhbGciOiJ...",
      refresh_token: "eyJhbGciOiJ...",
      user: {
        username: "benlee",
        email: "ben.lee@example.com",
        fullName: "Benjamin Lee",
        city: "New York"
      }
    }
  })
  @Post('register')
  register(@Body(new YupValidationPipe(registerScheme)) registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOkResponse({
    description: "JWT tokens and user object are returned",
    example: {
      access_token: "eyJhbGciOiJ...",
      refresh_token: "eyJhbGciOiJ...",
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

  @Post('refresh')
  @ApiOkResponse({
    description: "JWT tokens and user object are returned",
    example: {
      access_token: "eyJhbGciOiJ...",
      refresh_token: "eyJhbGciOiJ...",
    user: {
        username: "benlee",
        email: "ben.lee@example.com",
        fullName: "Benjamin Lee",
        city: "New York"
    }}
  })
  @ApiBody({type: RefreshDto})
  refresh(@Body(new YupValidationPipe(refreshSchema)) refreshDto: RefreshDto) {
    console.log(`refresh token:`, refreshDto.refresh_token)
    return this.authService.refresh(refreshDto);
  }
}
