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
    description: "JWT token is returned",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmZjNDBjMC1kMjk2LTQ2YjQtODZiZi1lOTY3MzRhODc3N2UiLCJ1c2VybmFtZSI6ImJlbmxlZSIsImlhdCI6MTc3MjczMTEwMiwiZXhwIjoxNzcyNzMyOTAyfQ.mXXV-M9GlxRXQu5uhbHk4vX8cPc-LnAXqzVyICs8NQA"
  })
  @Post('register')
  register(@Body(new YupValidationPipe(registerScheme)) registerDto: RegisterDto) {
    console.log(registerDto);
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOkResponse({
    description: "JWT token is returned",
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2YmZjNDBjMC1kMjk2LTQ2YjQtODZiZi1lOTY3MzRhODc3N2UiLCJ1c2VybmFtZSI6ImJlbmxlZSIsImlhdCI6MTc3MjczMTEwMiwiZXhwIjoxNzcyNzMyOTAyfQ.mXXV-M9GlxRXQu5uhbHk4vX8cPc-LnAXqzVyICs8NQA"
  })
  @ApiBody({type: LoginDto})
  login(@Body(new YupValidationPipe(loginSchema)) loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
