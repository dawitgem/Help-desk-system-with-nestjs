import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { TicketService } from 'src/ticket/ticket.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [SocketGateway,TicketService,PrismaService],
})
export class SocketModule {}
