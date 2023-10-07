import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly UserService: UserService,
    PrismaService: PrismaService,
  ) {}

  @Post('update/:id')
  async updateProfile(@Param('id') updateUserDto: UpdateUserDto) {}
}
