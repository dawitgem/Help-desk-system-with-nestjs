import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Users } from '@prisma/client';

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
    const user = this.Prisma.users.findUnique({
      where: {
        Email,
      },
    });
    if (!user) return null;

    return user;
  }
  async SignUP(data: Prisma.UsersCreateInput): Promise<Users | null> {
    const user = this.Prisma.users.create({
      data: data,
    });

    return user;
  }
  async updateUser(params: {
    where: Prisma.UsersWhereUniqueInput;
    data: Prisma.UsersUpdateInput;
  }): Promise<Users> {
    const user = this.Prisma.users.update({
      where: params.where,
      data: params.data,
    });
    if (!user) return null;
    return user;
  }
}
