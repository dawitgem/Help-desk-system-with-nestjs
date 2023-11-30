import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Imap from 'node-imap';
import { simpleParser } from 'mailparser';
import { v1 as uuidv1 } from 'uuid';
import { TicketService } from 'src/ticket/ticket.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ImapService {
  private client: any;
  private email_array = [];
  constructor(
    private readonly configService: ConfigService,
    private readonly ticketService: TicketService,
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
  ) {
    console.log('email ticket page loaded');
    this.connectToImap();
  }
  private connectToImap() {
    this.client = new Imap({
      user: this.configService.get<string>('EMAIL_USER'),
      password: this.configService.get<string>('EMAIL_PASS'),
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
      keepalive: true,
    });
    this.client.once('ready', () => {
      this.readNewEmails();
    });

    this.client.once('error', (err: any) => {
      console.log(err);
    });
    this.client.connect();
  }
  private readNewEmails() {
    let email_buffer = [];
    try {
      this.client.openBox('INBOX', false, (openBoxErr, mailbox) => {
        if (openBoxErr) {
          this.client.end();
          return;
        }

        this.client.on('mail', () => {
          const searchCriteria = ['UNSEEN'];
          const fetchOptions = {
            bodies: '',
            markSeen: true,
            struct: true,
          };
          this.client.search(searchCriteria, (error, results) => {
            if (!results || !results.length) {
              console.log(
                "The server didn't find  emails matching the specified criteria",
              );
              return;
            }
            const fetch = this.client.fetch(results, fetchOptions);
            fetch.on('message', (msg, seqno) => {
              var prefix = '(#' + seqno + ') ';
              msg.on('body', (stream, info) => {
                var buffer = '',
                  count = 0;

                stream.on('data', (chunk) => {
                  count += chunk.length;
                  buffer += chunk.toString('utf8');
                });
                stream.once('end', function () {
                  email_buffer.push(buffer);
                });
              });
              msg.once('end', function () {});
            });
            fetch.once('end', async () => {
              const parsedEmails = email_buffer.map(async (buffer, i) => {
                var dataheader = Imap.parseHeader(buffer);
                if (Object.keys(dataheader).length > 0) {
                  let emails_data = {
                    date: dataheader.date[0],
                    subject: dataheader.subject[0],
                    from: dataheader.from[0],
                    to: dataheader.to[0],
                    content: (await simpleParser(buffer)).html,
                    attachment: (await simpleParser(buffer)).attachments,
                  };

                  return emails_data;
                }
              });
              await this.addEmailTickets(await Promise.all(parsedEmails));
            });
          });
        });
      });
    } catch (e) {
      console.log(e);
    }
  }
  private async addEmailTickets(emails: any) {
    const lastEmail = emails.length - 1;
    const email = emails[lastEmail];
    const content = email.content;
    const emailRegex = /<([^>]+)>/;
    const nameRegex = /^([^<]*)/;
    const date = new Date(Date.parse(email.date));
    const TicketId = parseInt(uuidv1().replace(/-/g, ''), 16)
      .toString()
      .replace('.', '')
      .replace('e+', '');
    const name = email.from.match(nameRegex)
      ? email.from.match(nameRegex)[1]
      : null;
    const Email = email.from.match(emailRegex)
      ? email.from.match(emailRegex)[1]
      : null;
    let userId: string = null;
    if (Email) {
      const Userdata = {
        Id: parseInt(uuidv1().replace(/-/g, ''), 16)
          .toString()
          .replace('.', '')
          .replace('e+', ''),
        FullName: name,
        Password: ' ',
        UserName: name,
        Email: Email,
        Image: null,
        About: null,
        UserType: 'Customer',
        WorkingPhone: null,
        MobilePhone: null,
        CreatedDate: date,
        Verified: false,
      };
      const user = (await this.userService.Login({ Email }))
        ? await this.userService.Login({ Email })
        : await this.userService.EmailUser(Userdata);
      if (user) {
        userId = user.Id;
      }
    }
    const TicketData = {
      Id: TicketId,
      UserId: userId,
      Type: 'Question',
      ReportedVia: 'Email',
      Email: Email,
      Priority: 'Low',
      Subject: email.subject,
      Content: content,
      FirstResponseDue: new Date(
        Date.parse(date.toISOString()) + 14 * 24 * 60 * 60 * 1000,
      ),
      ResolutionDue: new Date(
        Date.parse(date.toISOString()) + 30 * 24 * 60 * 60 * 1000,
      ),
      CreatedAt: date,
      UpdatedAt: null,
      Status: 'Open',
    };
    const ticket = await this.ticketService.newTicket(TicketData);
    console.log(ticket);
    if (email.attachment.length > 0) {
      try {
        const url = await this.firebaseService.uploadAttachments(
          email.attachment,
        );
        if (url && url.length > 0) {
          email.attachment.map(async (attach: any, i: number) => {
            const attachment = {
              Id: parseInt(uuidv1().replace(/-/g, ''), 16)
                .toString()
                .replace('.', '')
                .replace('e+', ''),
              FileName: attach.filename,
              FilePath: url[i].toString(),
              Size: attach.size,
              Mimi_Type: attach.contentType,
              TicketId: TicketId,
              ReplyId: null,
              CannedResponseId: null,
              Createdat: date,
              CreatedBy: null,
            };
            const file = await this.ticketService.newAttachment(attachment);
            console.log(file);
          });
        }
      } catch (e) {}
    }
  }
}
