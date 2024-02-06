import { Controller, Get } from '@nestjs/common';
import { SolutionsService } from './solutions.service';

@Controller('solutions')
export class SolutionsController {
    constructor(private readonly solutionService:SolutionsService){}
    @Get("articles")
    async getArticles(){
        
    }
}
