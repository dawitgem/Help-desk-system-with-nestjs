import { Controller, Get, Query } from '@nestjs/common';
import { TicketService } from 'src/ticket/ticket.service';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  @Get('')
  async GetSearchQuery(
    @Query('type') queryType: string,
    @Query('query') query: string,
  ) {
    if (queryType === 'all') {
      const Tickets = await this.searchService.searchTicket(query);
      const Article = await this.searchService.searchArticle(query);

      const Ticket = Tickets.map((ticket) => {
        const {
          Id,
          Type,
          Priority,
          Subject,
          Content,
          UserId,
          CreatedAt,
          UpdatedAt,
        } = ticket;
        const tickets = {
          Id,
          Type,
          Priority,
          Subject,
          Content,
          UserId,
          CreatedAt,
          UpdatedAt,
        };
        return tickets;
      });
      const article = [];
      return { Ticket, article };
    }
    if (queryType === 'tickets') {
      const Tickets = await this.searchService.searchTicket(query);
      const Ticket = Tickets.map((ticket) => {
        const {
          Id,
          Type,
          Priority,
          Subject,
          Content,
          UserId,
          CreatedAt,
          UpdatedAt,
        } = ticket;
        const tickets = {
          Id,
          Type,
          Priority,
          Subject,
          Content,
          UserId,
          CreatedAt,
          UpdatedAt,
        };
        return tickets;
      });
      const Article = [];
      return { Ticket, Article };
    }
    if (queryType === 'articles') {
      const Article = await this.searchService.searchArticle(query);
      const Ticket = [];
      return { Ticket, Article };
    }
  }
}
