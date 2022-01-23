import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      first_name: 'Shipwreck',
      last_name: 'Brew',
      role: 'Team',
      email: 's@brew.com',
    },
  ];
  findAll() {
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === +id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  create(createUserDto: any) {
    this.users.push(createUserDto);
  }

  update(id: number, updateUserDto: any) {
    const existingUser = this.findOne(id);
    if (existingUser) {
      // update the existing entity
    }
  }
  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === +id);
    if (userIndex >= 0) {
      this.users.splice(userIndex, 1);
    }
  }
}
