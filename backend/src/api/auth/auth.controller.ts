import { Controller, Body, Post, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { User } from '../user/entities/user.entity'

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post()
  login(@Body() user: Pick<User, 'email' | 'password'>) {
    return this.authService.login(user)
  }
}
