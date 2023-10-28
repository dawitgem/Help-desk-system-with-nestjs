import { Injectable } from '@nestjs/common';
import { Prisma, Tickets } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async searchTicket(query: string): Promise<Tickets[]> {
    console.log(query);
    const Ticket = await this.prisma.tickets.findMany({
      where: {
        Subject: {
          contains: query,
        },
      },
    });
    console.log(Ticket);
    return Ticket;
  }
  async searchArticle(query: string) {
    return [];
  }
}
