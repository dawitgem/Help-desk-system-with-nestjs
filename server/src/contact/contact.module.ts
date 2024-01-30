import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [ContactService,PrismaService]
})
export class ContactModule {}
