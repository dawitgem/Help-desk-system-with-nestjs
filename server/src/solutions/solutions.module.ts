import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SolutionsController } from './solutions.controller';
import { SolutionsService } from './solutions.service';

@Module({})
export class SolutionsModule {
    providers: [SolutionsService, PrismaService]
  controllers: [SolutionsController]
}
