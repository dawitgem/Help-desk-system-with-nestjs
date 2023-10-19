import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { AttachmentDto, newTicketDto } from './Ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly TicketService: TicketService) {}
  @Get('/user/:id')
  async getTickets(@Param('id') userId: string) {
    console.log(userId);
    const Tickets = await this.TicketService.getUserTickets(userId);
    console.log(Tickets);
    return Tickets.map((ticket) => {
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
      return {
        Id,
        Type,
        Priority,
        Subject,
        Content,
        UserId,
        CreatedAt,
        UpdatedAt,
      };
    });
  }
  @Post('new')
  async newTicket(@Body() newTicketDto: newTicketDto) {
    const Ticket = await this.TicketService.newTicket(newTicketDto);
    const {
      Id,
      Type: IssueType,
      Priority,
      Subject,
      Content: Description,
      UserId,
      CreatedAt,
      UpdatedAt,
    } = Ticket;
    return {
      Id,
      IssueType,
      Priority,
      Subject,
      Description,
      UserId,
      CreatedAt,
      UpdatedAt,
    };
  }
  @Get('attachment')
  async fetchAttachments() {
    const attachement = await this.TicketService.fetchAttachment();
    return attachement.map((attach) => {
      const {
        Id,
        FileName,
        FilePath,
        Size,
        Mimi_Type,
        TicketId,
        Createdat,
        CreatedBy,
      } = attach;
      return {
        Id,
        FileName,
        FilePath,
        Size,
        Mimi_Type,
        TicketId,
        Createdat,
        CreatedBy,
      };
    });
  }
  @Post('attachment/new')
  async newAttachment(@Body() attachmentDto: AttachmentDto) {
    const attachement = await this.TicketService.newAttachment(attachmentDto);
    const {
      Id,
      FileName,
      FilePath,
      Size,
      Mimi_Type,
      TicketId,
      Createdat,
      CreatedBy,
    } = attachement;
    return {
      Id,
      FileName,
      FilePath,
      Size,
      Mimi_Type,
      TicketId,
      Createdat,
      CreatedBy,
    };
  }
}
