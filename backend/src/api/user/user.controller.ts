import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  Req,
  Delete,
  HttpCode,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { Express } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id)
  }

  @HttpCode(201)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const newUser = await this.userService.create(createUserDto)
    const newUserAvatar = await this.userService.addAvatar(
      newUser.id,
      file.buffer,
      file.originalname,
    )
    return newUserAvatar
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const updateUser = await this.userService.update(id, updateUserDto)
    if (file) {
      return await this.userService.addAvatar(
        id,
        file.buffer,
        file.originalname,
      )
    }
    return updateUser
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id)
  }

  @Delete('avatar/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(@Req() request: { id: number }) {
    return this.userService.deleteAvatar(request.id)
  }
}
