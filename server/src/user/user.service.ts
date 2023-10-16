import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Users, Hi } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NotFoundError } from 'rxjs';
import { UpdatePasswordDto } from './user.dto';
import { PasswordUpdateException } from 'src/exception/unauthorized.exception';

@Injectable()
export class UserService {
  constructor(private Prisma: PrismaService) {}
  async User({ Id }: Prisma.UsersWhereUniqueInput): Promise<Users | null> {
    const user = this.Prisma.users.findUnique({
      where: {
        Id,
      },
    });
    return user;
  }

  async LoginAgent(where: Prisma.UsersWhereUniqueInput): Promise<Users | null> {
    const user = await this.Prisma.users.findUnique({
      where: where,
    });
    return user;
  }

  async Login({ Email }: Prisma.UsersWhereUniqueInput): Promise<Users | null> {
    const user = await this.Prisma.users.findUnique({
      where: {
        Email,
      },
    });
    if (!user) return null;

    return user;
  }
  async SignUP(data: Prisma.UsersCreateInput): Promise<Users | null> {
    let Password: string;
    if (data.Password) {
      try {
        Password = await bcrypt.hash(data.Password, 10);
      } catch (e) {
        console.log(e);
      }
    } else Password = ' ';
    const user = await this.Prisma.users.create({
      data: {
        ...data,
        Password,
      },
    });
    return user;
  }
  async updateUser(Id: string, data: Prisma.UsersUpdateInput): Promise<Users> {
    const profile = await this.Prisma.users.update({
      where: { Id },
      data: data,
    });
    return profile;
  }
  async updatePassword(Id: string, data: UpdatePasswordDto): Promise<Users> {
    let user = await this.User({ Id });
    let result: boolean;
    if (!user) throw new PasswordUpdateException("User Doesn't exist");
    if (data.newPassword && user.Password) {
      try {
        result = await bcrypt.compare(data.currentPassword, user.Password);
      } catch (e) {
        throw new PasswordUpdateException(
          'something wrong . Please try again ',
        );
      }
      if (result) {
        const Password = await bcrypt.hash(data.newPassword, 10);
        user = await this.Prisma.users.update({
          where: { Id },
          data: {
            Password,
          },
        });
      } else throw new PasswordUpdateException('Incorrect Password');
    }
    return user;
  }
}
