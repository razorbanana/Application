import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule} from '@nestjs/jwt';
import dotenv from 'dotenv'
import { AuthGuard } from './guards/auth.guard';
import { OptionalAuthGuard } from './guards/optional.guard'
dotenv.config()

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'they will never know',
      signOptions: {expiresIn: '30s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard, OptionalAuthGuard],
  exports: [AuthGuard]
})
export class AuthModule {}
