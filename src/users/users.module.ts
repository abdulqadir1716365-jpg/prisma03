import { Module } from '@nestjs/common';
import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { UsersDbService } from './users-db.service.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersDbService],
})
export class UsersModule {}
