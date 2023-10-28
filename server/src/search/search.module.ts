import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchService } from './search.service';

@Module({
  providers: [SearchService, PrismaService],

  controllers: [SearchController],
})
export class SearchModule {}
