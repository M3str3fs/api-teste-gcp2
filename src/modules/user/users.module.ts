import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from '../roles/roles.module';

import {
  DeleteUserService,
  ListUserService,
  UpdateUserPasswordService,
  UpdateUserService,
  CreateUserService,
} from './services';

@Module({
  imports: [
    ConfigModule,
    RolesModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    DeleteUserService,
    ListUserService,
    UpdateUserPasswordService,
    UpdateUserService,
    CreateUserService,
  ],
  exports: [
    UsersService,
    DeleteUserService,
    ListUserService,
    UpdateUserPasswordService,
    UpdateUserService,
    CreateUserService,
  ],
})
export class UsersModule {}
