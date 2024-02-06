import { Injectable } from '@nestjs/common';
import { Attachement, Prisma, Tickets } from '@prisma/client';
import { FormatDateOptions, format } from 'date-fns';
import { off } from 'process';
import { promises } from 'readline';
import { start } from 'repl';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketService {
  constructor(private readonly prisma: PrismaService) {}
  async getAllTickets(): Promise<Tickets[] | null> {
    return await this.prisma.tickets.findMany({
      
      orderBy: {
        CreatedAt: 'desc',
      },
    });
  }
  async getAgentTickets(): Promise<Tickets[] | null> {
    return await this.prisma.tickets.findMany({
      
      orderBy: {
        CreatedAt: 'desc',
      },
    });
  }
  
  async getTicket(Id: string): Promise<Tickets | null> {
    return await this.prisma.tickets.findUnique({
      where: {
        Id,
      },
    });
  }
  async getUserTickets(
    Id: string,
    offset: number,
    limit: number,
  ): Promise<{ Tickets: Tickets[]; count: number } | null> {
    const Tickets = await this.prisma.tickets.findMany({
      where: {
        UserId: Id,
      },
      skip: offset,
      take: limit,
      orderBy: {
        CreatedAt: 'desc',
      },
    });
    const count = await this.prisma.tickets.count({
      where: {
        UserId: Id,
      },
    });
    if (!Tickets && count === 0) {
      return null;
    }
    return { Tickets, count };
  }
  async newTicket(data: Prisma.TicketsCreateInput): Promise<Tickets> {
    const Ticket = await this.prisma.tickets.create({
      data,
    });
    return Ticket;
  }
  async newEmailTicket(data: Prisma.TicketsCreateInput): Promise<Tickets> {
    console.log(data);
    return;
  }
  async fetchSingleAttachment(Id: string): Promise<Attachement[] | null> {
    return await this.prisma.attachement.findMany({
      where: {
        TicketId: Id,
      },
    });
  }
  async fetchAttachment(): Promise<Attachement[]> {
    const Attachement = await this.prisma.attachement.findMany();
    return Attachement;
  }
  async newAttachment(
    data: Prisma.AttachementCreateInput,
  ): Promise<Attachement> {
    console.log(data);
    const Attachment = await this.prisma.attachement.create({
      data,
    });
    return Attachment;
  }
  async updateTicket(Id: string, data: Prisma.TicketsUpdateInput) {
    const Ticket = await this.prisma.tickets.update({
      where: {
        Id,
      },
      data,
    });
    return Ticket;
  }
  async deleteTicket(Id: string): Promise<Tickets> {
    const attachment = await this.prisma.attachement.deleteMany({
      where: {
        TicketId: Id,
      },
    });
    const ticket = await this.prisma.tickets.delete({
      where: {
        Id,
      },
    });
    return ticket;
  }
  async deleteAttachment(Id: string): Promise<Attachement> {
    const attachement = await this.prisma.attachement.delete({
      where: { Id },
    });
    return attachement;
  }
  async countTicket():Promise<any>{
    try {
      const unresolvedtickets=await this.prisma.tickets.count({
        where:{
          Type:{not:"resolved"}
      }})
      const dueDatetickets=await this.prisma.tickets.count({
        where:{
          ResolutionDue:{
            lt:new Date()
          }
        }
      }) 
      const overDuetickets=await this.prisma.tickets.count({
        where:{
          ResolutionDue:{
            lt:new Date()
          }
        }
      })
      const opentickets=await this.prisma.tickets.count({
        where:{
          Status:"Open"
        }
      })
      const onHoldtickets=await this.prisma.tickets.count({
        where:{
          Status:"on Hold"
        }
      })
      const unAssignedtickets=await this.prisma.tickets.count()-await this.prisma.ticketAgent.count()
      console.log(unAssignedtickets)
      return {unresolved:unresolvedtickets,open:opentickets,onhold:onHoldtickets,overdue:overDuetickets,duedate:dueDatetickets,unassigned:unAssignedtickets}
      
    } catch (error) {
      
    }finally{
      this.prisma.$disconnect()
    }
    
  }
  
async countTicketbyday():Promise<any> {
  try {
    const currentDate = new Date();
    const previousDate = new Date(currentDate);
    previousDate.setDate(previousDate.getDate() - 1); 


    const currentDayCounts = await this.countTicketsForDay(currentDate);
      const previousDayCounts = await this.countTicketsForDay(previousDate);
      console.log(currentDayCounts)

      return { previousDay: previousDayCounts, currentDay: currentDayCounts };
    }
    catch (error) {
      console.error('Error:', error);
      return { previousDay: [], currentDay: [] };
    }
  }

  private async countTicketsForDay(date: Date): Promise<number[]> {
    console.log(date)
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const counts = [];

    for (let hour = 0; hour < 24; hour++) {
      const startHour = new Date(startOfDay);
      startHour.setHours(hour);

      const endHour = new Date(startOfDay);
      endHour.setHours(hour + 1);

      const count = await this.prisma.tickets.count({
        where: {
          CreatedAt: {
            gte: startHour,
            lt: endHour,
          },
        },
      });
         
      counts.push(count);
    }

    return counts;
  }

}