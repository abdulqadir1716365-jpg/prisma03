import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersDbService } from './users-db.service.js';
import { UserMapper } from './users.mapper.js';
import { CreateUserDto, UpdateUserDto, UserResponse } from './users.types.js';

@Injectable()
export class UsersService {
  constructor(private usersDb: UsersDbService) {}

  async createUser(dto: CreateUserDto): Promise<UserResponse> {
    const user = await this.usersDb.create(dto);
    return UserMapper.toResponse(user);
  }

  async getAllUsers(): Promise<UserResponse[]> {
    const users = await this.usersDb.findAll();
    return UserMapper.toResponseArray(users);
  }

  async getUserById(id: number): Promise<UserResponse> {
    const user = await this.usersDb.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return UserMapper.toResponse(user);
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<UserResponse> {
    // Pehle check karein user exist karta hai ya nahi
    await this.getUserById(id);
    const updatedUser = await this.usersDb.update(id, dto);
    return UserMapper.toResponse(updatedUser);
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    await this.getUserById(id);
    await this.usersDb.delete(id);
    return { message: 'User deleted successfully' };
  }
}
