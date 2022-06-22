import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from '../projects/entities/project.entity'
import { User } from './entities/user.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { Avatar } from '../files/entities/avatar.entity'
import { FilesService } from '../files/files.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Project, Avatar])],
  controllers: [UserController],
  providers: [UserService, FilesService],
  exports: [UserService],
})
export class UserModule {}
