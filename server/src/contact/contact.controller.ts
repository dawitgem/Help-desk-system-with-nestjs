import { Controller, Get, Param } from '@nestjs/common';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactservice:ContactService){

    }
  @Get()
  async getcontacts(){
    const contacts=await this.contactservice.getcontacts()
    console.log(contacts)
    return contacts

  }  
  @Get("/:Id")
  async getcontact(@Param('Id') contactId: string){
    console.log(contactId)
    const contact=await this.contactservice.getcontact(contactId)
    console.log(contact)
    return contact
    
  }
  @Get("/:Id/ticket")
  async getTicket(@Param('Id') contactId: string){
    console.log(contactId)
    const ticket=await this.contactservice.getContactTicket(contactId)
    console.log(ticket)
    return ticket
    
  }
}
