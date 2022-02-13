import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Patch,
  Delete,
  HttpCode,
} from '@nestjs/common'
import { Roles } from 'src/roles/roles.decoration'
import { Role } from 'src/roles/role.enum'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.Admin)
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id)
  }

  @HttpCode(201)
  @Post()
  @Roles(Role.Admin)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id') id: number) {
    return this.userService.remove(id)
  }
}
