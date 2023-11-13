import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { AttachmentDto, newTicketDto } from './Ticket.dto';
import { UserService } from 'src/user/user.service';

@Controller('ticket')
export class TicketController {
  constructor(
    private readonly TicketService: TicketService,
    private readonly UserService: UserService,
  ) {}
  @Get()
  async getAllTickets() {
    const Tickets = await this.TicketService.getAllTickets();
    const Ticket = Tickets.map(async (ticket) => {
      const user =
        ticket.UserId && (await this.UserService.contact(ticket.UserId));
      if (user) return { Ticket: ticket, Contact: user };
      else return { Ticket: ticket, Contact: ticket.Email };
    });
    console.log(await Promise.all(Ticket));
    return await Promise.all(Ticket);
  }
  @Get(':Id')
  async getUserTicket(@Param('Id') TicketId: string) {
    const Ticket = await this.TicketService.getTicket(TicketId);
    if (Ticket) {
      const {
        Id,
        Type,
        Priority,
        Subject,
        Content,
        UserId,
        Status,
        CreatedAt,
        UpdatedAt,
      } = Ticket;
      console.log(Ticket);
      return {
        Id,
        Type,
        Priority,
        Subject,
        Content,
        UserId,
        Status,
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
        Status,
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
        Status,
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
      Status,
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
      Status,
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
  @Delete('attachment/:Id')
  async deleteAttachment(@Param('Id') attachId: string) {
    const attachement = await this.TicketService.deleteAttachment(attachId);
    console.log(attachement);
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
  @Put(':Id')
  async updateTicket(
    @Param('Id') userId: string,
    @Body() updateTicket: newTicketDto,
  ) {
    const Ticket = await this.TicketService.updateTicket(userId, updateTicket);
    const {
      Id,
      Type: IssueType,
      Priority,
      Subject,
      Content: Description,
      UserId,
      CreatedAt,
      Status,
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
      Status,
      UpdatedAt,
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
