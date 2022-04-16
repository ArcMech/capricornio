import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { Project } from '../projects/entities/project.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  findAll() {
    return this.userRepository.find({
      relations: ['projects'],
    })
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id, {
      relations: ['projects'],
    })
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

    const projects =
      createUserDto?.projects &&
      (await Promise.all(
        createUserDto.projects.map((id) => this.preloadProjects(id)),
      ))

    const user = this.userRepository.create({
      ...createUserDto,
      password,
      name: `${createUserDto.first_name} ${createUserDto.last_name}`,
      projects,
    })

    this.userRepository.save(user)
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const projects =
      updateUserDto?.projects &&
      (await Promise.all(
        updateUserDto.projects.map((id) => this.preloadProjects(id)),
      ))
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
      name: `${updateUserDto.first_name} ${updateUserDto.last_name}`,
      projects,
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

  private async preloadProjects(id: number): Promise<Project> {
    const existingProject = await this.projectRepository.findOne({ id })
    if (existingProject) {
      return existingProject
    }

    throw new HttpException(`Not found #${id} project`, HttpStatus.NOT_FOUND)
  }
}
