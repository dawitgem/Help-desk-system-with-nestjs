import { Injectable } from '@nestjs/common';
import { Tickets, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
    constructor(private readonly prisma:PrismaService){}
    async getcontacts():Promise<Users[]>{
        try {
            const contacts=await this.prisma.users.findMany({where:{
                UserType:"Customer"
            }})
            console.log(contacts)
            return contacts
            
        } catch (e:any) {
            console.log(e)

            
        }finally{
            this.prisma.$disconnect()
        }
    
    } 
    async getcontact(Id:string):Promise<Users>{
        try {
            const contact=await this.prisma.users.findUnique({where:{
                Id
            }})
            console.log(contact)
            return contact
            
        } catch (e:any) {
            console.log(e)

            
        }finally{
            this.prisma.$disconnect()
        }
    
    }
    async getContactTicket(Id:string):Promise<Tickets[]>{
        try {
            const Tickets=await this.prisma.tickets.findMany({where:{
                UserId:Id
            }})
            console.log(Tickets)
            return Tickets
            
        } catch (e:any) {
            console.log(e)

            
        }finally{
            this.prisma.$disconnect()
        }
    
    }
}

