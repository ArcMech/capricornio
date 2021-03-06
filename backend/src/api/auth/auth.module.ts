import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from '../user/user.module'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { AuthController } from './auth.controller'

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '30 days' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
