import { Body, Injectable, Req } from '@nestjs/common'
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

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(username)
    const isAuthorized = bcrypt.compare(password, user.password)
    if (isAuthorized) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      return result
    }
    throw Error('Wrong password')
  }

  async login(@Req() request: Pick<User, 'email' | 'password'>) {
    // @ts-ignore
    const user = await this.userService.findOneByEmail(request.body.email)
    // @ts-ignore
    const isAuthorized = bcrypt.compare(request.body.password, user.password)

    if (isAuthorized) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user
      const payload = { email: user.email, id: user.id }
      return { ...result, access_token: this.jwtService.sign(payload) }
    }
    throw Error('Wrong password')
  }
}
