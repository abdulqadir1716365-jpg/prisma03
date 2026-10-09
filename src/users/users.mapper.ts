import { User } from '@prisma/client';
import { UserResponse } from './users.types.js';

export class UserMapper {
  static toResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };
  }

  static toResponseArray(users: User[]): UserResponse[] {
    return users.map(user => this.toResponse(user));
  }
}
