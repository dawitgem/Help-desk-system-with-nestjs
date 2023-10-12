import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Put('update/:id')
  async updateProfile(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.UserService.updateUser(userId, updateUserDto);
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
