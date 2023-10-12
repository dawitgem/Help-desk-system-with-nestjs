import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Users, Hi } from '@prisma/client';

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
    const user = await this.Prisma.users.create({
      data: data,
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
}
