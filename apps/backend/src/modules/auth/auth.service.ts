import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  login(createAuthDto: LoginDto) {
    return 'login';
  }

  register(registerDto: RegisterDto) {
    return `register`;
  }
}
