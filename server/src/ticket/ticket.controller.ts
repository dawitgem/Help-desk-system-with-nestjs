import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { AttachmentDto, newTicketDto } from './Ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly TicketService: TicketService) {}
  @Get(':Id')
  async getTicket(@Param('Id') TicketId: string) {
    const Ticket = await this.TicketService.getTicket(TicketId);
    if (Ticket) {
      const {
        Id,
        Type,
        Priority,
        Subject,
        Content,
        UserId,
        CreatedAt,
        UpdatedAt,
      } = Ticket;
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
    }
    return null;
  }
  @Get('/user/:id')
  async getTickets(
    @Param('id') userId: string,
    @Query('offset') offset: string,
    @Query('limit') limit: string,
  ) {
    const { Tickets, count } = await this.TicketService.getUserTickets(
      userId,
      parseInt(offset),
      parseInt(limit),
    );
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
    return { Ticket, count };
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
  @Get('attachment/:Id')
  async fetchAttachment(@Param('Id') attachId: string) {
    const attachement = await this.TicketService.fetchSingleAttachment(
      attachId,
    );
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
  @Delete(':Id')
  async DeleteTicket(@Param('Id') TicketId: string) {
    const Ticket = await this.TicketService.deleteTicket(TicketId);
    if (Ticket) {
      const {
        Id,
        Type,
        Priority,
        Subject,
        Content,
        UserId,
        CreatedAt,
        UpdatedAt,
      } = Ticket;
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
    }
    return null;
  }
}
