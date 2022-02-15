import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  findAll() {
    return this.userRepository.find()
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id)
    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }
    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.userRepository.findOne({ email })
    if (!user) {
      throw new NotFoundException(`User with this email doesn't exist`)
    }
    return user
  }

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt()
    const password = await bcrypt.hash(createUserDto.password, salt)

    const checkIfUserExist = await this.userRepository.findOne({
      email: createUserDto.email,
    })
    if (checkIfUserExist) {
      throw new NotFoundException(
        `User with email ${createUserDto.email} exists in base`,
      )
    }

    const user = this.userRepository.create({
      ...createUserDto,
      password,
      name: `${createUserDto.first_name} ${createUserDto.last_name}`,
    })

    this.userRepository.save(user)
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
      name: `${updateUserDto.first_name} ${updateUserDto.last_name}`,
    })
    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }
    return this.userRepository.save(user)
  }
  async remove(id: number) {
    const user = await this.findOne(id)
    return this.userRepository.remove(user)
  }
}
