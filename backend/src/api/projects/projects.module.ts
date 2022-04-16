import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'
import { Project } from './entities/project.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Project])], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeature
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
