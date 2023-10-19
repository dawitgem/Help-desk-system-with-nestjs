import { Injectable } from '@nestjs/common';
import { Attachement, Prisma, Tickets } from '@prisma/client';
import { promises } from 'readline';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  async getUserTickets(Id: string): Promise<Tickets[] | null> {
    console.log(Id);
    const Tickets = await this.prisma.tickets.findMany({
      where: {
        UserId: Id,
      },
      orderBy: {
        CreatedAt: 'desc',
      },
    });
    if (!Tickets) {
      return null;
    }
    return Tickets;
  }
  async newTicket(data: Prisma.TicketsCreateInput): Promise<Tickets> {
    const Ticket = await this.prisma.tickets.create({
      data,
    });
    console.log(Ticket);
    return Ticket;
  }
  async fetchAttachment(): Promise<Attachement[]> {
    const Attachement = await this.prisma.attachement.findMany();
    return Attachement;
  }
  async newAttachment(
    data: Prisma.AttachementCreateInput,
  ): Promise<Attachement> {
    const Attachment = await this.prisma.attachement.create({
      data,
    });
    return Attachment;
  }
}
