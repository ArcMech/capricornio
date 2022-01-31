import { Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './api/auth/auth.service';
import { User } from './api/user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  async login(@Request() req: Pick<User, 'email' | 'password'>) {
    return this.authService.login(req);
  }
}
