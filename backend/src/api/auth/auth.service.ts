import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '../user/entities/user.entity'

import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email)

    const isAuthorized = await bcrypt.compare(password, user.password)
    if (isAuthorized) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    throw Error('Wrong password')
  }

  async login(request: Pick<User, 'email' | 'password'>) {
    const user = await this.userService.findOneByEmail(request.email)
    const isAuthorized = await bcrypt.compare(request.password, user.password)

    if (isAuthorized) {
      const { password, ...result } = user
      const payload = { email: user.email, id: user.id }
      return { ...result, access_token: this.jwtService.sign(payload) }
    }
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'Wrong username or password. Try once more.',
      },
      HttpStatus.FORBIDDEN,
    )
  }
}
