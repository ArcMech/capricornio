import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateProjectDto } from './dto/create-project.dto'
import { UpdateProjectDto } from './dto/update-project-dto'
import { Project } from './entities/project.entity'

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepository.find({
      relations: ['assigned_users'],
    })
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne(id, {
      relations: ['assigned_users'],
    })

    if (!project) {
      throw new HttpException(`Project #${id} not found`, HttpStatus.NOT_FOUND)
    }
    return project
  }

  create(createCoffeeDto: CreateProjectDto) {
    const project = this.projectRepository.create(createCoffeeDto)

    return this.projectRepository.save(project)
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.preload({
      id: +id,
      ...updateProjectDto,
    })
    if (!project) {
      throw new NotFoundException(`Coffee #${id} not found`)
    }
    return this.projectRepository.save(project)
  }

  async remove(id: number) {
    const project = await this.projectRepository.findOne(id)
    return this.projectRepository.remove(project)
  }
}
