import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [TicketService, PrismaService],
  controllers: [TicketController],
})
export class TicketModule {}
