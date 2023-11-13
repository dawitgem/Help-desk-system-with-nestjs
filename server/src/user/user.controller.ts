import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdatePasswordDto, UpdateUserDto } from './user.dto';
import { PassThrough } from 'stream';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}
  @Get(':id')
  async getUser(@Param('id') userId: string) {
    const user = await this.UserService.contact(userId);
    console.log(user);
    if (user) {
      const {
        Id,
        FullName,
        Email,
        UserName,
        Image,
        UserType,
        WorkingPhone,
        MobilePhone,
        Verified,
      } = user;
      return {
        Id,
        FullName,
        Email,
        UserName,
        Image,
        UserType,
        WorkingPhone,
        MobilePhone,
        Verified,
      };
    }
  }
  @Put('update/:id')
  async updateProfile(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.UserService.updateUser(userId, updateUserDto);
    if (user) {
      const {
        Id,
        FullName,
        Email,
        UserName,
        Image,
        UserType,
        WorkingPhone,
        MobilePhone,
        Verified,
      } = user;
      return {
        Id,
        FullName,
        Email,
        UserName,
        Image,
        UserType,
        WorkingPhone,
        MobilePhone,
        Verified,
      };
    }
  }

  @Put('updatePassword/:id')
  async updatePassword(
    @Param('id') userId: string,
    @Body() UpdatePassword: UpdatePasswordDto,
  ) {
    const user = await this.UserService.updatePassword(userId, UpdatePassword);
    const {
      Id,
      FullName,
      Email,
      UserName,
      Image,
      UserType,
      WorkingPhone,
      MobilePhone,
    } = user;
    return {
      Id,
      FullName,
      Email,
      UserName,
      Image,
      UserType,
      WorkingPhone,
      MobilePhone,
    };
  }
}
